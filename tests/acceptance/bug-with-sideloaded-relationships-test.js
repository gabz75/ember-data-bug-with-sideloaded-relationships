import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | bug-with-sideloaded-relationships');

test('it breaks', function(assert) {
  const json = {
    "data": [{
      "type": "users",
      "id": "1",
      "attributes": {
        "id": "1",
      },
      "links": {
        "self": "/v1/users/1"
      },
      "relationships": {
        "contracts": {
          "links": {
            "related": "/v1/users/1/contracts"
          },
          "data": [{
            "type": "contracts",
            "id": "1"
          }]
        },
      }
    }],
    "meta": {
      "count": 1,
      "total": 1
    },
    "included": [{
      "type": "contracts",
      "id": "1",
      "attributes": {
      },
      "links": {
        "self": "/v1/contracts/1"
      },
      "relationships": {
        "package": {
          "links": {
            "related": "/v1/packages/1"
          },
          "data": {
            "type": "packages",
            "id": "1"
          }
        },
        "user": {
          "links": {
            "related": "/v1/users/1"
          }
        }
      }
    }, {
      "type": "packages",
      "id": "1",
      "attributes": {
      },
      "links": {
        "self": "/v1/packages/1"
      },
      "relationships": {
        "contract": {
          "links": {
            "related": "/v1/contracts/1"
          }
        }
      }
    }]
  };

  const store = this.application.__container__.lookup('service:store');

  assert.expect(4);

  Ember.run(() => {
    store.pushPayload(json);

    const user = store.peekAll('user').objectAt(0);

    assert.ok(user.get('id'));
    assert.ok(user.get('contracts.firstObject.id'));

    const contract = user.get('contracts.firstObject');

    assert.ok(contract.get('user.id'));
    assert.ok(contract.get('package.id'));
  });
});

test('it works', function(assert) {
  const json = {
    "data": [{
      "type": "users",
      "id": "1",
      "attributes": {
        "id": "1",
      },
      "links": {
        "self": "/v1/users/1"
      },
      "relationships": {
        "contracts": {
          "links": {
            "related": "/v1/users/1/contracts"
          },
          "data": [{
            "type": "contracts",
            "id": "1"
          }]
        },
      }
    }],
    "meta": {
      "count": 1,
      "total": 1
    },
    "included": [{
      "type": "contracts",
      "id": "1",
      "attributes": {
      },
      "links": {
        "self": "/v1/contracts/1"
      },
      "relationships": {
        "package": {
          "links": {
            "related": "/v1/packages/1"
          },
          "data": {
            "type": "packages",
            "id": "1"
          }
        },
        "user": {
          "links": {
            "related": "/v1/users/1"
          }
        }
      }
    }, {
      "type": "packages",
      "id": "1",
      "attributes": {
      },
      "links": {
        "self": "/v1/packages/1"
      },
      // /!\
      // /!\ Commenting out this section makes the test pass.
      // /!\
      //
      // "relationships": {
      //   "contract": {
      //     "links": {
      //       "related": "/v1/contracts/1"
      //     }
      //   }
      // }
    }]
  };

  const store = this.application.__container__.lookup('service:store');

  assert.expect(4);

  Ember.run(() => {
    store.pushPayload(json);

    const user = store.peekAll('user').objectAt(0);

    assert.ok(user.get('id'));
    assert.ok(user.get('contracts.firstObject.id'));

    const contract = user.get('contracts.firstObject');

    assert.ok(contract.get('user.id'));
    assert.ok(contract.get('package.id'));
  });
});
