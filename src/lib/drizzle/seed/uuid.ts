import { randomUUID } from 'crypto';
import { spawn } from 'child_process';

const uuid = randomUUID();

const child = spawn('clip');
child.stdin.write(uuid);
child.stdin.end();
