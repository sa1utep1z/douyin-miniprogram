function parseJobCondition(jobCondition) {
  if (jobCondition === 'NONE') {
    return '无要求';
  } else if (jobCondition === 'JOB') {
    return '需在职';
  }
  return '';
}
module.exports = {
  parseJobCondition: parseJobCondition
};