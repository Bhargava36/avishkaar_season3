// services/adminAccommodationService.js
const pool = require('../config/db');
const csv = require('csv-parser');
const { Readable } = require('stream');

//
// -------------------------------------------------------------
//  AUTO-ID GENERATION FUNCTIONS
// -------------------------------------------------------------
//  Blocks → B001, B002, B003...
//
async function generateBlockId() {
  const [rows] = await pool.query(
    `SELECT block_id FROM blocks ORDER BY block_id DESC LIMIT 1`
  );

  if (rows.length === 0) return "B001";

  const last = rows[0].block_id; // example: "B014"
  const num = parseInt(last.substring(1)) + 1;
  return "B" + String(num).padStart(3, "0");
}

//
// Rooms → R001, R002, R003...
//
async function generateRoomId() {
  const [rows] = await pool.query(
    `SELECT room_id FROM rooms ORDER BY room_id DESC LIMIT 1`
  );

  if (rows.length === 0) return "R001";

  const last = rows[0].room_id;
  const num = parseInt(last.substring(1)) + 1;
  return "R" + String(num).padStart(3, "0");
}

//
// -------------------------------------------------------------
//  BLOCKS SERVICES
// -------------------------------------------------------------
//
exports.getAllBlocks = async () => {
  const [rows] = await pool.query('SELECT * FROM blocks ORDER BY created_at DESC');
  return rows;
};

exports.createBlock = async ({ block_name, gender }) => {
  // Auto-generate block ID
  const block_id = await generateBlockId();

  await pool.query(
    'INSERT INTO blocks (block_id, block_name, gender) VALUES (?, ?, ?)',
    [block_id, block_name, gender || 'Male']
  );

  return { block_id };
};

exports.updateBlock = async (id, { block_name, gender }) => {
  const [result] = await pool.query(
    'UPDATE blocks SET block_name = ?, gender = ? WHERE block_id = ?',
    [block_name, gender, id]
  );
  return result.affectedRows > 0;
};

exports.deleteBlock = async (id) => {
  const [result] = await pool.query('DELETE FROM blocks WHERE block_id = ?', [id]);
  return result.affectedRows > 0;
};

//
// CSV Import (CSV already contains block_id → no auto-generation here)
//
exports.importBlocksFromCsvBuffer = async (buffer) => {
  const rows = [];
  const stream = Readable.from(buffer);

  return new Promise((resolve, reject) => {
    stream
      .pipe(csv())
      .on('data', (data) => {
        const b = {
          block_id: data.block_id || data.blockID || data.Block_ID || data['Block ID'] || '',
          block_name: data.block_name || data.blockName || data['Block Name'] || '',
          gender: (data.gender || data.Gender || 'Male').trim(),
        };
        if (b.block_id && b.block_name) rows.push(b);
      })
      .on('end', async () => {
        if (!rows.length) return resolve({ inserted: 0 });

        const values = rows.map((r) => [r.block_id, r.block_name, r.gender]);
        const placeholders = values.map(() => '(?, ?, ?)').join(', ');
        const flat = values.flat();

        await pool.query(
          'INSERT INTO blocks (block_id, block_name, gender) VALUES ' +
            placeholders +
            ' ON DUPLICATE KEY UPDATE block_name = VALUES(block_name), gender = VALUES(gender)',
          flat
        );

        resolve({ inserted: rows.length });
      })
      .on('error', (err) => reject(err));
  });
};

//
// -------------------------------------------------------------
//  ROOMS SERVICES
// -------------------------------------------------------------
//
exports.getAllRooms = async () => {
  const [rows] = await pool.query('SELECT * FROM rooms ORDER BY created_at DESC');
  return rows;
};

exports.createRoom = async ({ block_id, room_no, capacity, occupied }) => {
  // Auto-generate room ID
  const room_id = await generateRoomId();

  await pool.query(
    'INSERT INTO rooms (room_id, block_id, room_no, capacity, occupied) VALUES (?, ?, ?, ?, ?)',
    [room_id, block_id, room_no || null, Number(capacity) || 0, Number(occupied) || 0]
  );

  return { room_id };
};

exports.updateRoom = async (id, { block_id, room_no, capacity, occupied }) => {
  const [result] = await pool.query(
    'UPDATE rooms SET block_id = ?, room_no = ?, capacity = ?, occupied = ? WHERE room_id = ?',
    [block_id, room_no, Number(capacity) || 0, Number(occupied) || 0, id]
  );
  return result.affectedRows > 0;
};

exports.deleteRoom = async (id) => {
  const [result] = await pool.query('DELETE FROM rooms WHERE room_id = ?', [id]);
  return result.affectedRows > 0;
};

//
// CSV Import (CSV already contains room_id → no auto-generation here)
//
exports.importRoomsFromCsvBuffer = async (buffer) => {
  const rows = [];
  const stream = Readable.from(buffer);

  return new Promise((resolve, reject) => {
    stream
      .pipe(csv())
      .on('data', (data) => {
        const r = {
          room_id: data.room_id || data.roomID || data.Room_ID || data['Room ID'] || '',
          block_id: data.block_id || data.blockID || data.Block_ID || data['Block ID'] || '',
          room_no: data.room_no || data.roomNo || data['Room No'] || '',
          capacity: Number(data.capacity) || 0,
          occupied: Number(data.occupied) || 0,
        };
        if (r.room_id && r.block_id) rows.push(r);
      })
      .on('end', async () => {
        if (!rows.length) return resolve({ inserted: 0 });

        const conn = await pool.getConnection();
        try {
          await conn.beginTransaction();
          for (const r of rows) {
            await conn.query(
              `INSERT INTO rooms (room_id, block_id, room_no, capacity, occupied)
               VALUES (?, ?, ?, ?, ?)
               ON DUPLICATE KEY UPDATE block_id=VALUES(block_id),
               room_no=VALUES(room_no), capacity=VALUES(capacity), occupied=VALUES(occupied)`,
              [r.room_id, r.block_id, r.room_no, r.capacity, r.occupied]
            );
          }
          await conn.commit();
          conn.release();
          resolve({ inserted: rows.length });
        } catch (err) {
          await conn.rollback();
          conn.release();
          reject(err);
        }
      })
      .on('error', (err) => reject(err));
  });
};