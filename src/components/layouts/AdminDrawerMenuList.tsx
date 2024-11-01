'use client';

import { Fragment, memo, useEffect } from 'react';
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { usePathname } from 'next/navigation';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { AdminDrawerMenu } from '@/variables';
import { adminDrawerExpandedAtom } from '@/lib/jotai';

export type AdminDrawerMenuListProps = {
  items?: AdminDrawerMenu[];
  depth?: number;
  parentKey?: string;
};

export const AdminDrawerMenuList = memo((props: AdminDrawerMenuListProps) => {
  const { items = [], depth = 0, parentKey = '' } = props;
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useAtom(adminDrawerExpandedAtom);

  useEffect(() => {
    const expandParents = (
      items: AdminDrawerMenu[],
      currentPath: string,
      parentKey: string = ''
    ) => {
      let shouldExpand = false;

      items.forEach(item => {
        if ('children' in item && item.children) {
          const isChildSelected = item.children.some(
            child => 'href' in child && currentPath.startsWith(child.href)
          );

          if (isChildSelected) {
            setExpandedItems(prevState => ({
              ...prevState,
              [parentKey]: true,
            }));
            shouldExpand = true;
          }

          const childShouldExpand = expandParents(
            item.children,
            currentPath,
            `${parentKey}-${item.name}`
          );
          if (childShouldExpand) {
            setExpandedItems(prevState => ({
              ...prevState,
              [`${parentKey}-${item.name}`]: true,
            }));
            shouldExpand = true;
          }
        } else if ('href' in item && item.href === currentPath) {
          shouldExpand = true;
        }
      });

      return shouldExpand;
    };

    expandParents(items, decodeURI(pathname));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, items]);

  if (!items.length) return null;

  const handleItemClick = (hasChildren: boolean, parentKey: string) => {
    if (hasChildren) {
      setExpandedItems(prevState => ({
        // ...prevState,
        [parentKey]: !prevState[parentKey],
      }));
    }
  };

  return (
    <List disablePadding sx={{ p: 1 }}>
      {items.map((item, index) => {
        const hasChildren =
          'children' in item && Boolean(item.children?.length);
        const isSelected =
          decodeURI(pathname) === ('href' in item ? item.href : '');
        const isExpanded = expandedItems[`${parentKey}-${item.name}`] || false;

        return (
          <Fragment key={index}>
            <ListItem
              disablePadding
              sx={{
                my: 0,
                borderRadius: 0,
              }}
            >
              <ListItemButton
                LinkComponent={hasChildren ? undefined : Link}
                href={'href' in item ? item.href : '/'}
                sx={{ borderRadius: 0, p: 0.4, pl: `${depth * 6}px` }}
                onClick={() => {
                  if ('children' in item) {
                    handleItemClick(hasChildren, `${parentKey}-${item.name}`);
                  }
                }}
                selected={isSelected}
              >
                {item.icon && (
                  <ListItemIcon>
                    <item.icon color='primary' />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={
                    depth === 0
                      ? item.name
                      : // : `${index + 1 > 9 ? '' : '0'}${index + 1}. ${item.name}`
                        `${index + 1}. ${item.name}`
                  }
                  primaryTypographyProps={{
                    variant: 'body2',
                    color:
                      isSelected || isExpanded ? 'primary.main' : undefined,
                  }}
                />

                {hasChildren && (
                  <ListItemIcon
                    sx={{
                      minWidth: '22px',
                      rotate: isExpanded ? '180deg' : '0',
                    }}
                  >
                    <ArrowDropDownIcon
                      color={isSelected || isExpanded ? 'primary' : undefined}
                    />
                  </ListItemIcon>
                )}
              </ListItemButton>
            </ListItem>

            {hasChildren && (
              <Collapse
                in={isExpanded}
                timeout='auto'
                unmountOnExit
                sx={{
                  maxHeight: depth > 0 ? undefined : 400,
                  overflow: 'hidden',
                  overflowY: 'auto',
                }}
              >
                <AdminDrawerMenuList
                  items={item.children}
                  depth={depth + 1}
                  parentKey={`${parentKey}-${item.name}`}
                />
              </Collapse>
            )}

            {item.divider && <Divider sx={{ my: 1 }} />}
          </Fragment>
        );
      })}
    </List>
  );
});

AdminDrawerMenuList.displayName = 'AdminDrawerMenuList';
