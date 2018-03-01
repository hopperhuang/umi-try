export default function compose(methods) {
    let next;
    methods.reverse();
    next = methods.shift();
    methods.forEach(method => {
        next = method(next)
    });
    return next;
}

