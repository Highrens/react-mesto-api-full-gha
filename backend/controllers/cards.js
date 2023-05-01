//  const ConflictError = require('../errors/conflict-err');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
const SomethingWrongError = require('../errors/something-wrong-err');
const Card = require('../models/card');
//  const { populate } = require('../models/user');

// Get возвращает карты
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

// Post создает карту
module.exports.createCard = (req, res, next) => {
  Card.create(
    { name: req.body.name, link: req.body.link, owner: req.user._id },
  )
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new SomethingWrongError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

// delete удаляет карту
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .populate('owner')
    .then((card) => {
      if (card.owner._id.toString() === req.user._id.toString()) {
        Card.deleteOne(card).then((deletedCard) => {
          if (deletedCard) {
            res.send({ message: 'Карточка удалена' });
          } else {
            next(new NotFoundError('Карточка по указанному _id не найдена'));
          }
        });
      } else {
        next(new ConflictError('Нет доступа'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new SomethingWrongError('Ошибка: невалидный id'));
      } else {
        next(err);
      }
    });
};
module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
).populate('owner')
  .populate('likes')
  .then((card) => {
    if (card) {
      res.send(card);
    } else {
      next(new NotFoundError('Карточка по указанному _id не найдена'));
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new SomethingWrongError('Ошибка: невалидный id'));
    } else {
      next(err);
    }
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
).populate('owner')
  .populate('likes')
  .then((card) => {
    if (card) {
      res.send(card);
    } else {
      next(new NotFoundError('Карточка по указанному _id не найдена'));
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new SomethingWrongError('Ошибка: невалидный id'));
    } else {
      next(err);
    }
  });
