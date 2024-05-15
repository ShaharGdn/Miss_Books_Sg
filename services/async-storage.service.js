import { utilService } from "./util.service.js"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

// gets an entity from the local storage
function query(entityType, delay = 200) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

// gets an specific item from the local storage using query and find
function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity.id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

// post a new item to the required entity, break the entity make a new one, add an ID use query to get all the entity and push the new one. save to storage and return the newEntity
function post(entityType, newEntity) {
    newEntity = {...newEntity}
    newEntity.id = utilService.makeId()
    return query(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

// update an existing item . using query to get all entity from storage, then finding the item, breaking the updated entity and splicing (replacing) the existing item with the new one using splice. saving to storage. returning the updated entity. 
function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        const entityToUpdate = {...entities[idx], ...updatedEntity}
        entities.splice(idx, 1, entityToUpdate)
        _save(entityType, entities)
        return updatedEntity
    })
}

// remove, using query to get the books from ls, then using findindex to get the item. then splice without replacing. save to ls
function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

// save to ls using set item, and stringify
function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}
