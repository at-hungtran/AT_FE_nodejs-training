const Joi = require('joi');

const validPassword = Joi.extend((joi) => ({
  base: joi.string(),
  name: 'string',
  language: {
    error: 'username can not in to password'
  },
  rules: [
    {
      name: 'validPassword',
      validate(params, value, state, options) {
        const name = state.parent.userNames
        .split('')
        .filter((letter, index) => index < 4)
        .join('');
        
        let isValid = true;
        let sumLetter = '';

        for(let i = 0; i < value.length; i++) {
          if (name[0] === value[i]) {
            for (let j = i; j < i + name.length; j++) {
              sumLetter += value[j];
            }
            if (sumLetter === name) {
              isValid = false;
            }
          }
          sumLetter = '';
        }
        if (!isValid) {
          return this.createError('string.error', { v: value }, state, options);
        }
      }
    }
  ]
}));

module.exports = {
  request: {
    body: {
      names: Joi.string().options({
        language: {
          string: {
            base: 'must be a string'
          }
        }
      }),
      ages: Joi.number().min(18).max(25).required().options({
        language: {
          number: {
            base: 'must be a number',
            min: 'must be larger than or equal to {{limit}}',
            max: 'must be less than or equal to {{limit}}'
          }
        }
      }),
      passwords: validPassword.string().validPassword(),
      userNames: Joi.string().alphanum().min(3).max(30).required(),
      levels: Joi.number().min(3).max(30).required()
    }
  }
};
