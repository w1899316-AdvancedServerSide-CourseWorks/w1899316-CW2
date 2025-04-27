const express = require('express');
const router = express.Router();

router.get('',(req, res) => {
    return res.status(200).json({"message": "travel blog website version 1"});
});

module.exports = router;