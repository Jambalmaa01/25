// import { db, departmentsTable, organizationsTable, eq, zones } from '..';
// import { countryMongoliaId, userToumkuId } from '../seed/vars';
// import { boomtJSON } from './boomtBulk';
// import { zastavJSON } from './zastavJSON';

// async function seed() {
//   await db.transaction(async tx => {
//     console.log(boomtJSON.features.length);

//     return;

//     for (const dep of zastavJSON.features) {
//       const {
//         zastav_dug,
//         zastav_ner,
//         salbar_dug,
//         baig_on,
//         // xxtemdeg,
//         xxurt,
//         xxbchiglel,
//         xilees,
//         sumaas,
//         otryadoos,
//         b_uulzvar,
//         z_uulzvar,
//         // otryadod_,
//         zastav_zer,
//         gz_buschle,
//         // xaruul_too,
//         bcat,
//         // aimag_ner,
//         // sum_ner,
//         // gereet_xa,
//         // xxtx,
//         // albani_una,
//         // mxzurvas,
//         // ouxashaa,
//         // tsamkhag,
//         // xaruul_bai,
//         // xmbair,
//         mobicom,
//         skytel,
//         unitel,
//         gmobail,
//         // uulzalt_b,
//         tsah_uusve,
//         und_us,
//         us_too,
//         // txg,
//         // xil,
//         xuurai_gaz,
//         usaar,
//         angi_num,
//       } = dep.properties;

//       const organizations = await tx
//         .select()
//         .from(organizationsTable)
//         .where(eq(organizationsTable.identityNumber, angi_num));

//       const organization = organizations[0];

//       if (!organization) {
//         throw new Error(`Organization not found: ${angi_num}`);
//       }

//       const [x, y] = dep.geometry.coordinates;

//       if (salbar_dug.length !== 4) console.log(salbar_dug);

//       await tx
//         .insert(departmentsTable)
//         .values({
//           name: zastav_ner,
//           codeName: zastav_dug,
//           identityNumber: salbar_dug,
//           countryId: countryMongoliaId,
//           cityId: organization.cityId,
//           districtId: organization.districtId,
//           organizationId: organization.id,
//           addedAt: new Date(),
//           addedBy: userToumkuId,
//           geometry: `POINT(${x} ${y})`,
//           beverageSource: und_us,
//           beverageSourceNumber: us_too,
//           direction: xxbchiglel,
//           distanceFromBorder: xilees,
//           distanceFromDetachment: otryadoos,
//           distanceFromDistrict: sumaas,
//           distanceFromEastern: z_uulzvar,
//           distanceFromWestern: b_uulzvar,
//           editedAt: null,
//           editedBy: null,
//           electricPowerSource: tsah_uusve,
//           establishmentedDate: `${baig_on ? baig_on : 1000}-01-01`,
//           // id: null,
//           lengthDryLand: xuurai_gaz,
//           lengthResponsibleBorder: xxurt,
//           lengthWaterBoundaryLength: usaar,
//           networkGmobile: gmobail ? true : false,
//           networkMobicom: mobicom ? true : false,
//           networkSkytel: skytel ? true : false,
//           networkUnitel: unitel ? true : false,
//           networkVsat: bcat ? true : false,
//           ranking: zastav_zer,
//           removedAt: null,
//           removedBy: null,
//           zone: zones.includes(gz_buschle) ? gz_buschle : null,
//         })
//         .onConflictDoNothing();
//     }
//   });
// }

// seed()
//   .catch(e => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     process.exit(0);
//   });
