const adminService = require('../services/AdminAccommodationService');

exports.healthCheck = async (req, res) => {
  res.json({ ok: true, message: 'AdminAccommodation OK' });
};

/* ---------------------------------------------------------------------
   LIST EVERYTHING
------------------------------------------------------------------------*/
exports.listAll = async (req, res) => {
  try {
    const blocks = await adminService.getAllBlocks();
    const rooms = await adminService.getAllRooms();
    res.json({ ok: true, data: { blocks, rooms } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'DB error' });
  }
};

/* ---------------------------------------------------------------------
   BLOCKS
------------------------------------------------------------------------*/
exports.listBlocks = async (req, res) => {
  try {
    const rows = await adminService.getAllBlocks();
    res.json({ ok: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'DB error' });
  }
};

exports.createBlock = async (req, res) => {
  const { block_name, gender } = req.body;

  if (!block_name)
    return res.status(400).json({
      ok: false,
      message: 'Block name is required'
    });

  try {
    const { block_id } = await adminService.createBlock({
      block_name,
      gender
    });

    res.status(201).json({
      ok: true,
      message: 'Block created',
      block_id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'DB error' });
  }
};

exports.updateBlock = async (req, res) => {
  const { id } = req.params;
  const { block_name, gender } = req.body;

  try {
    const changed = await adminService.updateBlock(id, { block_name, gender });
    if (!changed) return res.status(404).json({ ok: false, message: 'Not found' });

    res.json({ ok: true, message: 'Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'DB error' });
  }
};

exports.deleteBlock = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await adminService.deleteBlock(id);
    if (!deleted) return res.status(404).json({ ok: false, message: 'Not found' });

    res.json({ ok: true, message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'DB error' });
  }
};

/* ---------------------------------------------------------------------
   BLOCK CSV IMPORT
------------------------------------------------------------------------*/
exports.importBlocks = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ ok: false, message: 'No file uploaded' });

    const result = await adminService.importBlocksFromCsvBuffer(req.file.buffer);

    res.json({ ok: true, inserted: result.inserted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Import error' });
  }
};

/* ---------------------------------------------------------------------
   ROOMS
------------------------------------------------------------------------*/
exports.listRooms = async (req, res) => {
  try {
    const rows = await adminService.getAllRooms();
    res.json({ ok: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'DB error' });
  }
};

exports.createRoom = async (req, res) => {
  const { block_id, room_no, capacity, occupied } = req.body;

  if (!block_id)
    return res.status(400).json({
      ok: false,
      message: 'block_id is required to assign the room to a block'
    });

  try {
    const { room_id } = await adminService.createRoom({
      block_id,
      room_no,
      capacity,
      occupied
    });

    res.status(201).json({
      ok: true,
      message: 'Room created',
      room_id
    });
  } catch (err) {
    console.error(err);

    if (err.errno === 1452)
      return res.status(400).json({
        ok: false,
        message: 'Invalid block_id (block does not exist)'
      });

    res.status(500).json({ ok: false, message: 'DB error' });
  }
};

exports.updateRoom = async (req, res) => {
  const { id } = req.params;
  const { block_id, room_no, capacity, occupied } = req.body;

  try {
    const changed = await adminService.updateRoom(id, {
      block_id,
      room_no,
      capacity,
      occupied
    });

    if (!changed) return res.status(404).json({ ok: false, message: 'Not found' });

    res.json({ ok: true, message: 'Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'DB error' });
  }
};

exports.deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await adminService.deleteRoom(id);
    if (!deleted) return res.status(404).json({ ok: false, message: 'Not found' });

    res.json({ ok: true, message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'DB error' });
  }
};

/* ---------------------------------------------------------------------
   ROOMS CSV IMPORT
------------------------------------------------------------------------*/
exports.importRooms = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ ok: false, message: 'No file uploaded' });

    const result = await adminService.importRoomsFromCsvBuffer(req.file.buffer);

    res.json({ ok: true, inserted: result.inserted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Import error' });
  }
};
