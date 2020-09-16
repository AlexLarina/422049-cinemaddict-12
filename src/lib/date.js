import moment from "moment";

const formatReleaseDate = (releaseDate) => {
  if (!(releaseDate instanceof Date)) {
    // кидать error ? или возвращать пустую строку как в демке ?
    // throw new Error(`Date has wrong format, not instance of Date`);
    releaseDate = new Date(releaseDate);
  }

  return moment(releaseDate).format(`DD MMMM YYYY`);
};

const formatReleaseYear = (releaseDate) => {
  if (!(releaseDate instanceof Date)) {
    releaseDate = new Date(releaseDate);
  }

  return moment(releaseDate).format(`YYYY`);
};

const formatDuration = (duration) => {
  if (typeof (duration) !== `number`) {
    duration = parseInt(duration, 10);
  }

  duration = moment
    .utc()
    .startOf(`day`)
    .add({
      minutes: duration
    });

  return `${duration.format(`H`)}h ${duration.format(`mm`)}m`;
};

const formatCommentDate = (commentDate) => moment(commentDate).format(`YYYY/MM/DD HH:mm`);

export {formatReleaseDate, formatReleaseYear, formatDuration, formatCommentDate};
