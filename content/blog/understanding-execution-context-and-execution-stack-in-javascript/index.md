---
title: Tìm Hiểu `Execution Context`(Ngữ Cảnh Thực Thi) và `Execution Stack`(Ngăn Xếp thực thi) trong Javascript.
date: "2021-03-22T14:31:54.733Z"
description: "Trong bài này chúng ta sẽ cùng tìm hiểu về `Execution Context` và `Execution Stack`, nó rất quan trọng để hiểu các khái niệm JavaScript khác như Hoisting, Scope và Closures."
tags: ["Javascript"]
---

## **`Execution Context` là gì?**

Nói một cách đơn giản, `Execution Context` là một khái niệm trừu tượng về một môi trường mà `code` Javascript được đánh giá và thực thi. Bất cứ khi nào, bất kỳ `code` nào được chạy bằng JavaScript, `code` đó sẽ được chạy bên trong một `Execution Context` nào đó.

### **Các loại `Execution Context`**

Có ba loại `Execution Context` trong JavaScript.

- **`Global Execution Context`(Ngữ Cảnh Thực Thi Toàn Cầu) --** Đây là `Execution Context` mặc định. `Code` không nằm trong bất kỳ `Function` nào nằm trong `Global Execution Context`. Nó thực hiện hai việc: Tạo ra một đối tượng toàn cục là một đối tượng cửa sổ(window) (trong trường hợp của các trình duyệt) và đặt giá trị của `This` bằng đối tượng toàn cục. Chỉ có thể có một `Global Execution Context` trong một chương trình.

- **`Function Execution Context`(Ngữ Cảnh Thực Thi Hàm) --** Mỗi khi một `Function` được gọi, một `Execution Context` hoàn toàn mới sẽ được tạo cho `Function` đó. Mỗi `Function` có `Execution Context` riêng, nhưng nó được tạo khi `Function` được thực thi. Không giới hạn số lượng `Function Execution Context`. Bất cứ khi nào một `Execution Context` mới được tạo, nó sẽ trải qua một loạt các bước theo thứ tự xác định mà tôi sẽ trình bày ở phần sau của bài viết này.

- **`Eval Function Execution Context`(Đánh Giá Ngữ Cảnh Thực Thi Hàm) --** `Code` được thực thi bên trong một `Function` `eval` cũng nhận được `Execution Context` của riêng nó, nhưng vì `eval` không thường được sử dụng bởi các nhà phát triển JavaScript, vì vậy tôi sẽ không thảo luận về nó ở đây.

### **Execution Stack** 

`Execution Stack`, còn được gọi là `"calling stack"` trong các ngôn ngữ lập trình khác, là một `Stack` có cấu trúc LIFO (Last In, First Out -> vào sau, ra trước), được sử dụng để lưu trữ tất cả các `Execution Context` được tạo trong quá trình thực thi `code`.

Khi trình thực thi JavaScript gặp tập lệnh của bạn lần đầu tiên, nó tạo `Global Execution Context` và đẩy nó vào `Execution Stack` hiện tại. Bất cứ khi nào trình thực thi JavaScript tìm thấy một lệnh gọi `Function`, nó sẽ tạo một `Execution Context` mới cho `Function` đó và đẩy nó lên đầu `Stack`.

Trình thực thi `Function` có `Execution Context` ở trên cùng của `Stack`. Khi `Function` này hoàn thành, `Execution Stack` của nó sẽ xuất hiện từ `Stack` và điều khiển đạt đến `Context` bên dưới nó trong `Stack` hiện tại.

Hãy hiểu điều này với một ví dụ `code` bên dưới:

```
    let a = 'Hello World!';

    function first() {
        console.log('Inside first function');
        second();
        console.log('Again inside first function');
    }

    function second() {
        console.log('Inside second function');
    }

    first();
    console.log('Inside Global Execution Context');
```

Khi `code` trên tải trong trình duyệt, trình thực thi JavaScript sẽ tạo `Global Execution Context` và đẩy nó vào `Execution Stack` hiện tại. Khi một lệnh gọi đến `first()` gặp phải, các trình thực thi JavaScript sẽ tạo một `Execution Context` mới cho `Function` đó và đẩy nó lên đầu `Execution Stack` hiện tại.

Khi `second()` được gọi từ bên trong `first()`, trình thực thi JavaScript tạo một `Execution Context` mới cho `Function` đó và đẩy nó lên đầu `Execution Stack` hiện tại. Khi `second()` kết thúc, `Execution Context` của nó sẽ xuất hiện từ `Stack` hiện tại và điều khiển đi đến `Execution Context` bên dưới nó, đó là `Execution Context` của `first()`.

Khi `first()` kết thúc, `Execution Stack` của nó bị xóa khỏi `Stack` và điều khiển đạt đến `Global Execution Context`. Khi tất cả `code` được thực thi, trình thực thi JavaScript sẽ xóa `Global Execution Context` khỏi `Stack` hiện tại.

### **`Execution Context` được tạo ra như thế nào?**

Cho đến bây giờ, chúng ta đã thấy cách trình thực thi JavaScript quản lý `Execution Context`, Bây giờ chúng ta hãy hiểu cách trình thực thi JavaScript tạo `Execution Context`.

`Execution Context` được tạo trong hai giai đoạn: **1) Creation Phase(Giai Đoạn Tạo)** và **2) Execution Phase(Giai đoạn Thực Thi)**.

#### **Creation Phase**
`Execution Context` được tạo trong `Creation Phase`. Những điều sau đây xảy ra trong `Creation Phase`:

1. **LexicalEnvironment** thành phần môi trường lexical được tạo.
2. **VariableEnvironment** Thành phần môi trường biến được tạo ra.

Vì vậy, `Execution Context` có thể được biểu diễn về mặt khái niệm như sau:

```
    ExecutionContext = {
        LexicalEnvironment = <ref. to LexicalEnvironment in memory>,
        VariableEnvironment = <ref. to VariableEnvironment in  memory>,
    }
```

**1. LexicalEnvironment**

Các tài liệu chính thức của ES6 định nghĩa LexicalEnvironment là

```
    A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code. A Lexical Environment consists of an `Environment Record` and a possibly null reference to an outer Lexical Environment.
```

Nói một cách đơn giản, LexicalEnvironment là một cấu trúc chứa ánh xạ `Variables` định danh (ở đây định danh đề cập đến tên của các `Variables` / `Function`, và `Variables` là tham chiếu đến đối tượng thực tế [bao gồm đối tượng `Function` và đối tượng `Array`] hoặc `primitive value`(giá trị nguyên thủy)).

Ví dụ: hãy xem xét đoạn `code` sau:

```
    var a = 20;
    var b = 40;

    function foo() {
        console.log('bar');
    }
```

Vì vậy, LexicalEnvironment cho đoạn `code` trên trông giống như sau:

```
    lexicalEnvironment = {
        a: 20,
        b: 40,
        foo: <ref. to foo function>
    }
```

Mỗi LexicalEnvironment có ba thành phần:

1. `Environment Record`(Bản ghi môi trường).
2. `Reference to the Outer Environment`(Tham chiếu đến môi trường bên ngoài).
3. `This Binding`(Sự ràng buộc `This`).

**i. `Environment Record`**

Environment Record là nơi lưu trữ các khai báo `Variables` và `Function` bên trong `LexicalEnvironment`.

Cũng có hai loại `Environment Record`:

- **Declarative Environment Record(Bản ghi môi trường khai báo) --** Như tên gọi của nó cho thấy lưu trữ các khai báo `Variables` và `Function`. `LexicalEnvironment` cho `function code` chứa `Environment Record` khai báo.
- **Object Environment Record(Bản ghi môi trường đối tượng) --** `LexicalEnvironment` cho `code` toàn cục chứa một `Environment Record`. Ngoài khai báo `Variables` và `Function`, `Object Environment Record` cũng lưu trữ một đối tượng liên kết toàn cục (window) (đối tượng cửa sổ trong trình duyệt). Vì vậy, đối với mỗi thuộc tính của đối tượng ràng buộc (trong trường hợp trình duyệt, nó chứa các thuộc tính và phương thức do trình duyệt cung cấp cho đối tượng cửa sổ), một mục nhập mới sẽ được tạo trong bản ghi.

Lưu ý - Đối với `function code`, `Environment Record` cũng chứa đối tượng đối số chứa ánh xạ giữa các chỉ mục và đối số được truyền cho `Function` và độ dài(số) của đối số được truyền vào `Function`.

Ví dụ, một đối tượng đối số cho `Function` dưới đây trông giống như sau:

```
    function foo(a, b) {
        var c = a + b;
    }

    foo(2, 3);
    // argument object
    Arguments: {0: 2, 1: 3, length: 2}
```

**ii. Reference to the Outer Environment**

`Reference to the Outer Environment` có nghĩa là nó có quyền truy cập vào `LexicalEnvironment` bên ngoài của nó. Điều đó có nghĩa là trình thực thi JavaScript có thể tìm kiếm các `Variables` bên trong môi trường bên ngoài nếu chúng không được tìm thấy trong `LexicalEnvironment` hiện tại.

**iii.This Binding**

Trong thành phần này, giá trị của `this` được xác định hoặc đặt.

Trong `Global Execution Context`, giá trị của `this` đề cập đến đối tượng toàn cục. (trong các trình duyệt, `this` đề cập đến đối tượng Cửa sổ).

Trong `Function Execution Context`, giá trị của `this` phụ thuộc vào cách `Function` được gọi. Nếu `this` được gọi bởi một tham chiếu đối tượng, thì giá trị của `this` được đặt cho đối tượng đó, nếu không, giá trị của `this` được đặt thành đối tượng toàn cục hoặc `undefined`(ở chế độ nghiêm ngặt). Ví dụ:

```
    const person = {
        name: 'peter',
        birthYear: 1994,
        calcAge: function() {
            console.log(2018 - this.birthYear);
        }
    }

    person.calcAge(); 
    // 'this' đề cập đến 'person', vì 'calcAge' được gọi bằng tham chiếu đối tượng 'person'

    const calculateAge = person.calcAge;
    calculateAge();
    // 'this' đề cập đến đối tượng cửa sổ toàn cầu, vì không có tham chiếu đối tượng nào được cung cấp
```

Tóm lại, `LexicalEnvironment` trông giống như thế này trong `code` này:

```
    GlobalExectionContext = {
        LexicalEnvironment: {
            EnvironmentRecord: {
                Type: "Object",
                // Các liên kết định danh tại đây
            }
            outer: <null>,
            this: <đối tượng toàn cầu>
        }
    }
    FunctionExectionContext = {
        LexicalEnvironment: {
            EnvironmentRecord: {
                Type: "Declarative",
                // Các liên kết định danh tại đây
            }
            outer: <Tham chiếu môi trường `Function` toàn cầu hoặc bên ngoài>,
            this: <phụ thuộc vào cách gọi `Function`>
        }
    }
```

**2. VariableEnvironment**

Nó cũng là một `LexicalEnvironment` có `EnvironmentRecord` giữ các liên kết được tạo bởi `VariableStatements` trong `Execution Context` này.

Như đã viết ở trên, `VariableEnvironment` cũng là một môi `LexicalEnvironment`, Vì vậy, nó có tất cả các thuộc tính và thành phần của một `LexicalEnvironment` như đã định nghĩa ở trên.

Trong ES6, một điểm khác biệt giữa thành phần **LexicalEnvironment** và thành phần **VariableEnvironment** là `LexicalEnvironment` được sử dụng để lưu trữ khai báo `Function` và các ràng buộc `Variables` (**let** và **const**). trong khi `VariableEnvironment` chỉ được sử dụng để lưu trữ các liên kết `Variables` (**var**).

### **Execution Phase**

Trong giai đoạn này, việc gán cho tất cả các `Variables` đó đã được thực hiện và `code` cuối cùng được thực thi.

**Ví Dụ**

Hãy xem một số ví dụ để hiểu các khái niệm trên:

```
    let a = 20;
    const b = 30;
    var c;

    function multiply(e, f) {
        var g = 20;
        return e * f * g;
    }

    c = multiply(20, 30);
```

Khi đoạn `code` trên được thực thi, trình thực thi JavaScript sẽ tạo một `Global Execution Context` để thực thi `code` chung. Vì vậy, `Global Execution Context` sẽ trông giống như thế này trong giai đoạn tạo:

```
    GlobalExectionContext = {

        LexicalEnvironment: {
            EnvironmentRecord: {
                Type: "Object",
                // Identifier bindings go here
                a: < uninitialized >,
                b: < uninitialized >,
                multiply: < func >
            }
            outer: <null>,
            ThisBinding: <Global Object>
        },

        VariableEnvironment: {
            EnvironmentRecord: {
                Type: "Object",
                // Identifier bindings go here
                c: undefined,
            }
            outer: <null>,
            ThisBinding: <Global Object>
        }
    }
```

Trong giai đoạn thực thi, các phép gán `Variables` được thực hiện. Vì vậy, `Global Execution Context` sẽ trông giống như thế này trong giai đoạn thực thi.

```
    GlobalExectionContext = {

        LexicalEnvironment: {
            EnvironmentRecord: {
                Type: "Object",
                // Identifier bindings go here
                a: 20,
                b: 30,
                multiply: < func >
            }
            outer: <null>,
            ThisBinding: <Global Object>
        },

        VariableEnvironment: {
            EnvironmentRecord: {
                Type: "Object",
                // Identifier bindings go here
                c: undefined,
            }
            outer: <null>,
            ThisBinding: <Global Object>
        }
    }
```

Khi một lệnh gọi `Function`  `multiply(20, 30)` gặp phải, một `Function Execution Context` mới được tạo để thực thi `function code`. Vì vậy, `Function Execution Context` sẽ trông giống như thế này trong giai đoạn tạo:

```
    FunctionExectionContext = {

        LexicalEnvironment: {
            EnvironmentRecord: {
                Type: "Declarative",
                // Identifier bindings go here
                Arguments: {0: 20, 1: 30, length: 2},
            },
            outer: <GlobalLexicalEnvironment>,
            ThisBinding: <Global Object or undefined>,
        },

        VariableEnvironment: {
            EnvironmentRecord: {
                Type: "Declarative",
                // Identifier bindings go here
                g: undefined
            },
            outer: <GlobalLexicalEnvironment>,
            ThisBinding: <Global Object or undefined>
        }
    }
```

Sau đó, `Execution Context` chuyển qua giai đoạn thực thi có nghĩa là việc gán cho các `Variables` bên trong `Function` được thực hiện. Vì vậy, `Function Execution Context` sẽ trông giống như thế này trong giai đoạn thực thi:

```
    FunctionExectionContext = {
        LexicalEnvironment: {
            EnvironmentRecord: {
                Type: "Declarative",
                // Identifier bindings go here
                Arguments: {0: 20, 1: 30, length: 2},
            },
            outer: <GlobalLexicalEnvironment>,
            ThisBinding: <Global Object or undefined>,
        },
        VariableEnvironment: {
            EnvironmentRecord: {
                Type: "Declarative",
                // Identifier bindings go here
                g: 20
            },
            outer: <GlobalLexicalEnvironment>,
            ThisBinding: <Global Object or undefined>
        }
    }
```

Sau khi `Function` hoàn thành, giá trị trả về được lưu trữ bên trong `c`. Vì vậy, `LexicalEnvironment` toàn cầu được cập nhật. Sau đó, `Code` toàn cục hoàn thành và chương trình kết thúc.

Lưu ý - Như bạn có thể nhận thấy rằng các `Variables` được định nghĩa `let` và `const` không có bất kỳ giá trị nào được liên kết với chúng trong `Creation Phase`, nhưng các `Variables` được xác định `var` được đặt thành `undefined`.

Điều này là do, trong `Creation Phase`, `code` được quét để tìm các khai báo `Variables` và `Function`, trong khi khai báo `Function` được lưu trữ toàn bộ trong môi trường, ban đầu các `Variables` được đặt thành `undefined` (trong trường hợp `var`) hoặc vẫn chưa được khởi tạo (trong trường hợp `let` và `const`).

Đây là lý do tại sao bạn có thể truy cập các `Variables` được xác định `var` trước khi chúng được khai báo (mặc dù chưa được xác định) nhưng lại gặp lỗi tham chiếu khi truy cập các `Variables` (`let` và `const`) trước khi chúng được khai báo.

Đây là, những gì chúng tôi gọi là `Hoisting`.

Lưu ý - Trong `Execution Phase`, nếu trình thực thi JavaScript không thể tìm thấy giá trị của `Variables` **`let`** tại vị trí thực tế mà nó được khai báo trong `code`, thì nó sẽ gán cho nó giá trị `undefined`.

## **Phần kết luận**

Vì vậy, chúng ta đã thảo luận về cách các chương trình JavaScript được thực thi nội bộ. Mặc dù bạn không cần thiết phải học tất cả các khái niệm này để trở thành một nhà phát triển JavaScript tuyệt vời, Việc hiểu rõ các khái niệm trên sẽ giúp bạn hiểu các khái niệm khác như `Hoisting`, `Scope`, `Closures` một cách dễ dàng và sâu sắc hơn.

Vậy là xong và nếu bạn thấy bài viết này hữu ích, vui lòng Share bài viết 👏 để mọi người hiểu hơn về Javascript nhé! Thanks.
