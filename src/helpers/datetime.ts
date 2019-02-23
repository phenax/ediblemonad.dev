import { compose } from 'ramda';
import { parse, format } from 'date-fns/fp';

const getBaseDate = () => new Date();

export const toBlogFormat = compose(
  format('do MMM, yyyy'),
  parse(getBaseDate(), 'yyyy/MM/dd'),
);

export { parse, format };
