// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'money.dart';

// **************************************************************************
// IsarCollectionGenerator
// **************************************************************************

// coverage:ignore-file
// ignore_for_file: duplicate_ignore, non_constant_identifier_names, constant_identifier_names, invalid_use_of_protected_member, unnecessary_cast, prefer_const_constructors, lines_longer_than_80_chars, require_trailing_commas, inference_failure_on_function_invocation, unnecessary_parenthesis, unnecessary_raw_strings, unnecessary_null_checks, join_return_with_assignment, prefer_final_locals, avoid_js_rounded_ints, avoid_positional_boolean_parameters, always_specify_types

extension GetMoneyCollection on Isar {
  IsarCollection<Money> get moneys => this.collection();
}

const MoneySchema = CollectionSchema(
  name: r'Money',
  id: 8874918762861247504,
  properties: {
    r'ammount': PropertySchema(
      id: 0,
      name: r'ammount',
      type: IsarType.long,
    ),
    r'date': PropertySchema(
      id: 1,
      name: r'date',
      type: IsarType.dateTime,
    )
  },
  estimateSize: _moneyEstimateSize,
  serialize: _moneySerialize,
  deserialize: _moneyDeserialize,
  deserializeProp: _moneyDeserializeProp,
  idName: r'id',
  indexes: {},
  links: {},
  embeddedSchemas: {},
  getId: _moneyGetId,
  getLinks: _moneyGetLinks,
  attach: _moneyAttach,
  version: '3.1.0+1',
);

int _moneyEstimateSize(
  Money object,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  var bytesCount = offsets.last;
  return bytesCount;
}

void _moneySerialize(
  Money object,
  IsarWriter writer,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  writer.writeLong(offsets[0], object.ammount);
  writer.writeDateTime(offsets[1], object.date);
}

Money _moneyDeserialize(
  Id id,
  IsarReader reader,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  final object = Money();
  object.ammount = reader.readLong(offsets[0]);
  object.date = reader.readDateTime(offsets[1]);
  object.id = id;
  return object;
}

P _moneyDeserializeProp<P>(
  IsarReader reader,
  int propertyId,
  int offset,
  Map<Type, List<int>> allOffsets,
) {
  switch (propertyId) {
    case 0:
      return (reader.readLong(offset)) as P;
    case 1:
      return (reader.readDateTime(offset)) as P;
    default:
      throw IsarError('Unknown property with id $propertyId');
  }
}

Id _moneyGetId(Money object) {
  return object.id;
}

List<IsarLinkBase<dynamic>> _moneyGetLinks(Money object) {
  return [];
}

void _moneyAttach(IsarCollection<dynamic> col, Id id, Money object) {
  object.id = id;
}

extension MoneyQueryWhereSort on QueryBuilder<Money, Money, QWhere> {
  QueryBuilder<Money, Money, QAfterWhere> anyId() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(const IdWhereClause.any());
    });
  }
}

extension MoneyQueryWhere on QueryBuilder<Money, Money, QWhereClause> {
  QueryBuilder<Money, Money, QAfterWhereClause> idEqualTo(Id id) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IdWhereClause.between(
        lower: id,
        upper: id,
      ));
    });
  }

  QueryBuilder<Money, Money, QAfterWhereClause> idNotEqualTo(Id id) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(
              IdWhereClause.lessThan(upper: id, includeUpper: false),
            )
            .addWhereClause(
              IdWhereClause.greaterThan(lower: id, includeLower: false),
            );
      } else {
        return query
            .addWhereClause(
              IdWhereClause.greaterThan(lower: id, includeLower: false),
            )
            .addWhereClause(
              IdWhereClause.lessThan(upper: id, includeUpper: false),
            );
      }
    });
  }

  QueryBuilder<Money, Money, QAfterWhereClause> idGreaterThan(Id id,
      {bool include = false}) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        IdWhereClause.greaterThan(lower: id, includeLower: include),
      );
    });
  }

  QueryBuilder<Money, Money, QAfterWhereClause> idLessThan(Id id,
      {bool include = false}) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        IdWhereClause.lessThan(upper: id, includeUpper: include),
      );
    });
  }

  QueryBuilder<Money, Money, QAfterWhereClause> idBetween(
    Id lowerId,
    Id upperId, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IdWhereClause.between(
        lower: lowerId,
        includeLower: includeLower,
        upper: upperId,
        includeUpper: includeUpper,
      ));
    });
  }
}

extension MoneyQueryFilter on QueryBuilder<Money, Money, QFilterCondition> {
  QueryBuilder<Money, Money, QAfterFilterCondition> ammountEqualTo(int value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'ammount',
        value: value,
      ));
    });
  }

  QueryBuilder<Money, Money, QAfterFilterCondition> ammountGreaterThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'ammount',
        value: value,
      ));
    });
  }

  QueryBuilder<Money, Money, QAfterFilterCondition> ammountLessThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'ammount',
        value: value,
      ));
    });
  }

  QueryBuilder<Money, Money, QAfterFilterCondition> ammountBetween(
    int lower,
    int upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'ammount',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<Money, Money, QAfterFilterCondition> dateEqualTo(
      DateTime value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'date',
        value: value,
      ));
    });
  }

  QueryBuilder<Money, Money, QAfterFilterCondition> dateGreaterThan(
    DateTime value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'date',
        value: value,
      ));
    });
  }

  QueryBuilder<Money, Money, QAfterFilterCondition> dateLessThan(
    DateTime value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'date',
        value: value,
      ));
    });
  }

  QueryBuilder<Money, Money, QAfterFilterCondition> dateBetween(
    DateTime lower,
    DateTime upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'date',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<Money, Money, QAfterFilterCondition> idEqualTo(Id value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'id',
        value: value,
      ));
    });
  }

  QueryBuilder<Money, Money, QAfterFilterCondition> idGreaterThan(
    Id value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'id',
        value: value,
      ));
    });
  }

  QueryBuilder<Money, Money, QAfterFilterCondition> idLessThan(
    Id value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'id',
        value: value,
      ));
    });
  }

  QueryBuilder<Money, Money, QAfterFilterCondition> idBetween(
    Id lower,
    Id upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'id',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }
}

extension MoneyQueryObject on QueryBuilder<Money, Money, QFilterCondition> {}

extension MoneyQueryLinks on QueryBuilder<Money, Money, QFilterCondition> {}

extension MoneyQuerySortBy on QueryBuilder<Money, Money, QSortBy> {
  QueryBuilder<Money, Money, QAfterSortBy> sortByAmmount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'ammount', Sort.asc);
    });
  }

  QueryBuilder<Money, Money, QAfterSortBy> sortByAmmountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'ammount', Sort.desc);
    });
  }

  QueryBuilder<Money, Money, QAfterSortBy> sortByDate() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'date', Sort.asc);
    });
  }

  QueryBuilder<Money, Money, QAfterSortBy> sortByDateDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'date', Sort.desc);
    });
  }
}

extension MoneyQuerySortThenBy on QueryBuilder<Money, Money, QSortThenBy> {
  QueryBuilder<Money, Money, QAfterSortBy> thenByAmmount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'ammount', Sort.asc);
    });
  }

  QueryBuilder<Money, Money, QAfterSortBy> thenByAmmountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'ammount', Sort.desc);
    });
  }

  QueryBuilder<Money, Money, QAfterSortBy> thenByDate() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'date', Sort.asc);
    });
  }

  QueryBuilder<Money, Money, QAfterSortBy> thenByDateDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'date', Sort.desc);
    });
  }

  QueryBuilder<Money, Money, QAfterSortBy> thenById() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'id', Sort.asc);
    });
  }

  QueryBuilder<Money, Money, QAfterSortBy> thenByIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'id', Sort.desc);
    });
  }
}

extension MoneyQueryWhereDistinct on QueryBuilder<Money, Money, QDistinct> {
  QueryBuilder<Money, Money, QDistinct> distinctByAmmount() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'ammount');
    });
  }

  QueryBuilder<Money, Money, QDistinct> distinctByDate() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'date');
    });
  }
}

extension MoneyQueryProperty on QueryBuilder<Money, Money, QQueryProperty> {
  QueryBuilder<Money, int, QQueryOperations> idProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'id');
    });
  }

  QueryBuilder<Money, int, QQueryOperations> ammountProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'ammount');
    });
  }

  QueryBuilder<Money, DateTime, QQueryOperations> dateProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'date');
    });
  }
}
