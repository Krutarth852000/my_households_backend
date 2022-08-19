const calculateSplit = ( paidBy, membersList, length, amount ) => {
    console.log(membersList);
    const splittedAmount = +Number(amount / length).toFixed(2);
    const membersBalance = membersList.map((member) => {
        if (member.id.toString() === paidBy.toString()) {
            return {
                memberId: member.id,
                name: member.FirstName,
                balance: Number(amount - splittedAmount).toFixed(2),
            };
        } else {
            return {
                memberId: member.id,
                name: member.FirstName,
                balance: `-${Number(splittedAmount).toFixed(2)}`,
            };
        }
    });
    return membersBalance;
};
module.exports = calculateSplit;