module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    },
    eq: (a, b) => {
        return a === b;
    },
    contributedTotal: (contributors) => {
        let totalAmount = 0;
        for (var key in contributors) {
            totalAmount += contributors[key].amount;
        }
        return totalAmount;
    }
};