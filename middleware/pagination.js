module.exports = model => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    // const cm = req.query.isComment;
    // let postIdsToCheck = req.query.postIdsToCheck.json_data;
    console.log('AAAAA', req.query);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments({ parentId: null }).exec())) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }

    if (req.query.isComment === 'true') {
      try {
        results.results = await model
          .find({
            bibimId: {
              $in: req.query.bibimId
            }
          })
          .find({
            topParentId: {
              $in: req.query.topParentId
            }
          })
          .sort({ date: -1 })
          .exec();

        res.paginatedResults = results;

        next();
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    } else {
      try {
        results.results = await model
          .find()
          .find({ parentId: null })
          .sort({ date: -1 })
          .limit(limit)
          .skip(startIndex)
          .exec();

        res.paginatedResults = results;

        next();
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    }
  };
};
