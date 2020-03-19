module.exports = model => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const cm = req.query.cm;
    // let postIdsToCheck = req.query.postIdsToCheck.json_data;
    console.log('req', req.query);

    // let postIdsToCheck = [];

    // postIdsToCheck.push(parseInt(req.query.postIdsToCheck));

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
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
    // console.log('WWW', page, limit, cm, postIdsToCheck);

    if (cm === 'true') {
      try {
        // console.log('postIdsToCheck VV : ', req.query.postIdsToCheck);

        results.results = await model
          .find({
            parentId: {
              $in: req.query.jsonData
            }
          })
          .sort({ date: -1 })
          .exec();

        res.paginatedResults = results;

        console.log('results.results', results.results);

        next();
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    } else {
      try {
        results.results = await model
          .find({ parentId: null })
          .sort({ date: -1 })
          .limit(limit)
          .skip(startIndex)
          .exec();

        res.paginatedResults = results;
        // console.log('results.results', results.results);

        next();
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    }
  };
};
