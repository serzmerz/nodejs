module.exports = {
    INVALID_TYPE: 'Некорректный тип данных',
    ENUM_MISMATCH: 'Недопустимое значение',
    ANY_OF_MISSING: 'Недопустимое значение',
    ONE_OF_MISSING: 'Недопустимое значение',
    ONE_OF_MULTIPLE: 'Недопустимое значение',
    NOT_PASSED: 'Недопустимое значение',

    NUMBER_MULTIPLE_OF: 'Значение должно быть кратным {multipleOf}',
    NUMBER_MINIMUM: 'Значение должно быть не меньше, чем {minimum}',
    NUMBER_MINIMUM_EXCLUSIVE: 'Значение должно быть больше, чем {minimum}',
    NUMBER_MAXIMUM: 'Значение должно быть не больше, чем {maximum}',
    NUMBER_MAXIMUM_EXCLUSIVE: 'Значение должно быть меньше, чем {maximum}',
    NUMBER_NOT_A_NUMBER: 'Значение не является числовым',

    STRING_LENGTH_SHORT: 'Слишком короткое значение, минимум символов – {minimum}',
    STRING_LENGTH_LONG: 'Слишком длинное значение, максимум символов – {maximum}',
    STRING_PATTERN: 'Неверный формат',

    OBJECT_PROPERTIES_MINIMUM: 'Слишком мало полей ({propertyCount}), минимум – {minimum}',
    OBJECT_PROPERTIES_MAXIMUM: 'Слишком много полей ({propertyCount}), максимум – {maximum}',
    OBJECT_REQUIRED: 'Обязательное поле',
    OBJECT_ADDITIONAL_PROPERTIES: 'Дополнительные поля не разрешены',
    OBJECT_DEPENDENCY_KEY: 'Зависит от других полей',

    ARRAY_LENGTH_SHORT: 'Набор значений слишком маленький ({length}), минимум – {minimum}',
    ARRAY_LENGTH_LONG: 'Набор значений слишком большой ({length}), максимум – {maximum}',
    ARRAY_UNIQUE: 'Значения не уникальны',
    ARRAY_ADDITIONAL_ITEMS: 'Дополнительные значения не разрешены',

    FORMAT_CUSTOM: '{message}',
    KEYWORD_CUSTOM: 'Неверный формат',

    CIRCULAR_REFERENCE: 'Круговая зависимость $refs: {urls}',

    UNKNOWN_PROPERTY: 'Неизвестное свойство'
};
