const tv4 = require('tv4');

const ruLang = require('./i18n/ru');

class Validator {
    /**
     * Устанаваливает язык
     * @param {String} lang
     */
    static setLang(lang) {
        this.constructor.lang = lang;
    }

    constructor() {
        /**
         * @private
         */
        const validator = this._validator = tv4.freshApi();

        validator.addLanguage('ru', ruLang);
        validator.language(this.constructor.lang);
    }

    /**
     * Добавляет схему для валидации
     * @param {Object|String} url
     * @param {Object} [schema]
     */
    addSchema(url, schema) {
        this._validator.addSchema(url, schema);
    }

    /**
     * Валидирует данные по схеме
     * @param {Object} data
     * @param {Object|String} schema
     * @returns {Object}
     */
    validate(data, schema) {
        return this._validator.validateMultiple(data, schema);
    }

    /**
     * Делаем уникальный ключ в message для i18n
     * @param {Array} errors
     * @returns {Array}
     * */
    localizedErrors(errors) {
        return errors.map(error => {
            if (error.code === 500) {
                error.message = error.params.message.format;

                delete error.params.message.format;

                return Object.assign({}, error.params.message, {
                    localizedDescription: error.message
                });
            }

            return {
                parameter: error.dataPath || '/' + error.params.key,
                code: String(error.code),
                localizedDescription: error.message
            };
        });
    }

    /**
     * Форматирует ошибки для удобного вывода
     * @param {Object} errors
     * @returns {Object}
     */
    prettifyErrors(errors) {
        return errors.reduce((ret, error) => {
            const subErrors = error.subErrors;

            if (subErrors) {
                ret = this.prettifyErrors(subErrors);
            } else {
                const dataPath = error.dataPath;

                ret[dataPath ? dataPath.split('/')[1] : error.params.key] = error.message;
            }

            return ret;
        }, {});
    }
}

/**
 * @static
 * @type {String}
 */
Validator.lang = 'ru';

module.exports = Validator;
