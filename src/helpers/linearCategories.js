const linearCategories = (categories, options = []) => {

    for (let category of categories) {
        options.push({ 
            value: category._id, 
            name: category.name, 
            parentId: category.parentId,
            type: category.type
        });
        if (category.children.length > 0) {
            linearCategories(category.children, options)
        }
    }

    return options;
}

export default linearCategories;