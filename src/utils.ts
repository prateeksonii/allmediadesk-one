export const hasX = (expression: string) => expression.includes("x");

export const isDigit = (digit: string) => digit >= '0' && digit <= '9';

export const hasPrecedence = (op1: string, op2: string) => {
  if (op2 == '(' || op2 == ')') {
    return false;
  }

  if ((op1 == '*' || op1 == '/') &&
    (op2 == '+' || op2 == '-')) {
    return false;
  }
  else
    return true;
}

export const applyOp = (op: string | undefined, b: number, a: number) => {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b == 0) {
        console.error("Cannot divide by zero");
      }
      return a / b;
    default:
      return 0;
  }
}

export const evaluate = (expression: string): number => {

  const tokens = expression.split('').filter(token => token.length > 0 && token !== ' ');

  const opStack: string[] = [];
  const valStack: number[] = [];

  for (let i = 0; i < tokens.length; i++) {
    // It's a digit
    if (isDigit(tokens[i])) {
      let num: string = "";

      while (i < tokens.length && isDigit(tokens[i])) {
        num += tokens[i];
        i++;
      }

      valStack.push(+num);

      // revert one extra step taken by while
      i--;

    } else if (tokens[i] == '(') {
      opStack.push(tokens[i]);
    } else if (tokens[i] == ')') {
      while (opStack.at(-1) != '(') {
        valStack.push(applyOp(opStack.pop(), valStack.pop()!, valStack.pop()!));
      }
      opStack.pop();
    } else if (['+', '-', '*', '/'].includes(tokens[i])) {
      while (opStack.length > 0 && hasPrecedence(tokens[i], opStack.at(-1)!)) {
        valStack.push(applyOp(opStack.pop(), valStack.pop()!, valStack.pop()!));
      }
      opStack.push(tokens[i]);
    }
  }

  while (opStack.length > 0) {
    valStack.push(applyOp(opStack.pop(), valStack.pop()!, valStack.pop()!));
  }

  return valStack.pop() ?? 0;
}