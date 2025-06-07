class Category {
    static CLOTHING = 'clothing';
    static TOOLS = 'tools';
    static SPORTS = 'sports';
    static ACCESSORIES = 'accessories';
    static FURNITURE = 'furniture';
    static PETS = 'pets';
    static GAMES = 'games';
    static BOOKS = 'books';
    static TECHNOLOGY = 'technology';

    static values() {
        return [
            Category.CLOTHING,
            Category.TOOLS,
            Category.SPORTS,
            Category.ACCESSORIES,
            Category.FURNITURE,
            Category.PETS,
            Category.GAMES,
            Category.BOOKS,
            Category.TECHNOLOGY
        ];
    }

    static isValid(category) {
        return Category.values().includes(category);
    }
}

module.exports = Category;