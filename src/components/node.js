function Node(id, className, index) {
    this.id = id;
    this.className = className;
    this.index = index;
    this.element = null;
    this.f = 0;
    this.h = 0;
    this.g = 0;
    this.previous = null;
}

module.exports = Node;