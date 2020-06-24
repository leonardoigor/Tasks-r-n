const moment = require('moment');

module.exports = app => {
  const getTask = async (r, s) => {
    const date = r.query.date
      ? r.query.date
      : moment()
          .startOf('day')
          .toDate();
    const results = await app.Tasks.find({userId: r.user.id}).catch(err =>
      s.status(400).json(err),
    );
    s.json(results);
  };

  const save = async (r, s) => {
    if (!r.body.desc || !r.body.desc.trim()) {
      return s.status(400).send('Descriçao é um campo invalido');
    }
    console.log(r.body);

    r.body.userId = r.user.id;
    await app
      .Tasks({desc: r.body.desc, estimateAt: r.body.estimateAt})
      .save((err, doc) => {
        if (err) {
          return s.status(400).json(err);
        } else {
          return s.status(204).json({doc});
        }
      });
  };

  const remove = async (r, s) => {
    const id = r.params.id;
    const userId = r.user.id;
    app.Tasks.findOneAndRemove({_id: id, userId}, err => {
      if (err) {
        const msg = 'Nao foi encontrado task deletada';
        s.status(400).send(msg);
      } else {
        s.status(200).send('Deletado com sucesso');
      }
    });
  };

  const UpdateTaskDoneAt = async (req, res, doneAt) => {
    const updateResult = await app.Tasks.findOne({
      _id: req.params.id,
    });

    updateResult.doneAt = doneAt;

    updateResult.save(err => {
      if (err) {
        return res.status(400).json('error:: ' + err);
      } else {
        res.status(200).json(updateResult);
      }
    });
  };

  const toggleTask = async (req, res) => {
    const result = await app.Tasks.findOne({
      _id: req.params.id,
    });

    if (!result) {
      const msg = 'Task com id ' + req.params.id + ' nao encontrada';
      return res.status(400).send(msg);
    }

    const doneAt = result.doneAt ? null : new Date();

    UpdateTaskDoneAt(req, res, doneAt);
  };

  return {getTask, save, remove, toggleTask};
};
