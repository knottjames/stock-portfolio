migrate((db) => {
  const collection = new Collection({
    "id": "b3atsyyriwj77gu",
    "created": "2023-06-23 08:15:46.732Z",
    "updated": "2023-06-23 08:15:46.732Z",
    "name": "portfolios",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yfc3blrl",
        "name": "userid",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "thjreuz2",
        "name": "stocks",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("b3atsyyriwj77gu");

  return dao.deleteCollection(collection);
})
