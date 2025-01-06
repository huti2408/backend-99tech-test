const input = 5

console.log("function basicSum")
function basicSum(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum
}
console.log(basicSum(input))

console.log("function recursionSum")
function recursionSum(n: number): number {
    if (n <= 1) return n
    return n + recursionSum(n - 1)
}
console.log(basicSum(input))
console.log("function formulaSum")
function formulaSum(n: number): number {
    return (n * (n + 1)) / 2;
}
console.log(formulaSum(input))
