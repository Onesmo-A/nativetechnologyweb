const fs = require('fs');
const zlib = require('zlib');
const crcTable = (() => {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table.push(c);
  }
  return table;
})();

function crc(buf) {
  let c = -1;
  for (const b of buf) {
    c = (c >>> 8) ^ crcTable[(c ^ b) & 0xff];
  }
  return (c ^ -1) >>> 0;
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const chunk = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc(chunk), 0);
  return Buffer.concat([len, Buffer.from(type, 'ascii'), data, crcBuf]);
}

function createPNG(width, height, color) {
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 4);
    row[0] = 0;
    for (let x = 0; x < width; x++) {
      row[1 + x * 4] = color[0];
      row[1 + x * 4 + 1] = color[1];
      row[1 + x * 4 + 2] = color[2];
      row[1 + x * 4 + 3] = 255;
    }
    rows.push(row);
  }

  const idat = zlib.deflateSync(Buffer.concat(rows));
  return Buffer.concat([
    header,
    createChunk('IHDR', ihdr),
    createChunk('IDAT', idat),
    createChunk('IEND', Buffer.alloc(0)),
  ]);
}

const dir = './public/images/brands';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const presets = [
  { name: 'client-01', color: [52, 120, 255] },
  { name: 'client-02', color: [255, 85, 85] },
  { name: 'client-03', color: [85, 255, 170] },
  { name: 'client-04', color: [255, 170, 0] },
  { name: 'client-05', color: [170, 85, 255] },
  { name: 'client-06', color: [0, 170, 255] },
];

presets.forEach((p) => {
  fs.writeFileSync(`${dir}/${p.name}.png`, createPNG(160, 40, p.color));
});

console.log('Generated placeholder PNG logos');
