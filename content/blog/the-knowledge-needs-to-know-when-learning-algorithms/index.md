---
title: Những kiến thức cần biết khi học Giải Thuật.
date: "2021-05-23T03:12:17.188Z"
description: Thuật toán là một "trang bị" không thể thiếu trên hành trình "tòng sư học đạo" để trở thành một "Effective Developer". Bài viết hôm nay sẽ giới thiệu một vài "tranh bị khởi đầu" dành cho bộ môn "Algorithms". Let's go!
tags: ["Programming", "Algorithms"]
---

## Variable (Biến)

Trước khi chúng ta cố gắng đi tìm một định nghĩa dành cho "variable", tôi sẽ kể lại cho bạn một kỷ niệm có thể là không mấy đẹp đẽ với một vài người khi thời còn dính "ass" vào ghế nhà trường. Buzz! Look at this:

#### <center> x<sup>2</sup> + 2y - 2 = 1</center>

May là trong bài biết hôm nay tôi sẽ không phổ cập lại cho bạn cách để giải biểu thức này. Điều chúng ta cần chú ý đến là
trong biểu thức này tồn tại hai cái "tên" là x, y và chúng đang nắm giữ một giá trị (dữ liệu) nào đó.
X và Y chúng là những "placeholders", là "hình nộm" thế thân và chúng đại diện cho các giá trị.
Tương tự, trong ngành Khoa học máy tính nói chung, <u><i> chúng ta đôi lúc cần "một cái gì đó" để đại diện vào nắm giữ giá trị (dữ liệu), và VARIABLES là cách thức để chúng ta làm điều đó </i></u>.

## Data Types (Kiểu dữ liệu)

Ở biểu thức bên trên, 2 biến x và y có thể là bất cứ giá trị nào, như chúng có thể là các số nguyên (10, 20), số thực (0.23, 5.5) hoặc đơn giản chỉ là 0 và 1.
Để giải được biểu thức, chúng ta cần phải chỉ ra rằng "hình dáng", "đặc điểm" của giá trị mà chúng ta muốn nhận được, và <u><i> "Data Types" là cái tên được sử dụng trong ngành Khoa học máy tính với mục đích đó</i> </u>

Một số kiểu dữ liệu phổ biến như: interger, float, unit number, character, string,...

Chắc có lẽ nhiều người cũng đã biết là bộ nhớ máy tính được "phủ đầy" bởi 2 con số 0 và 1. Nếu chúng ta muốn viết một lời giải thông qua việc coding thì đó thật là một "nightmare" (cơn ác mộng) thật sự. Vì thế, để làm "chuyện đó" dễ dàng hơn, các ngôn ngữ lập trình và các trình biên dịch (compiliers) khi được tạo ra đã cung cấp sẵn cho chúng ta các Data Types cần thiết. <u><i>Data Types trong các ngôn ngữ lập trình là một tập hợp đã được predefined (định nghĩa trước) các đặc tính của values (giá trị) mà các variable của chúng sẽ đại diện cho</i></u>.

Lấy một vài ví dụ như <i>interger</i> sẽ chiếm lấy 2 bytes (giá trị thực tế được quyết định bởi compilier), <i>float</i> sẽ chiếm lấy 4 bytes. Điều này sẽ nói cho compilier biết được là chúng ta đang tập hợp 2 bytes (16bit) lại và gọi vùng ô nhớ đó là 1 <i>interger</i>. Tương tự, ta sẽ thông báo cho compiler tập hợp 4 bytes (32bit) lại và vùng nhớ đó sẽ được gọi là 1 <i>float</i>.

Về căn bản chúng ta sẽ chia các kiểu dữ liệu ra thành 2 nhóm (loại) chính:
- System-defined data types (hay còn gọi là Primitive data types).
- User-defined data types.

### System-defined data types (Primitive data types)

Các kiểu dữ liệu mặc định được định nghĩa sẵn trong system (hệ thống) được gọi là kiểu dữ liệu <i>Primitive</i>

Một vài kiểu dữ liệu Primitive được phần lớn các Ngôn ngữ lập trình định nghĩa có thể kể đến như: int, float, double, bool,... Mỗi kiểu dữ liệu Primitive ở mỗi ngôn ngữ lập trình, hoặc compilier sẽ được chỉ định một số lượng <i>bits</i> nhất định và một <i>khoảng</i> của values mà nó có thể mang lấy.

Ví dụ như, kiểu <i>int</i> (trong C) sẽ lấy đi 2 bytes hoặc 4 bytes của memory. Nếu là 2 bytes (16bits), thì <i>khoảng</i> giá trị mà nó có thể mang là từ -32,768 (-2<sup>15</sup> đến 2<sup>15</sup> - 1) đến 32,767. Còn nếu là 4 bytes thì khoảng giá trị sẽ là từ -2,147,483,648 đến 2,147,483,647 (-2<sup>31</sup> đến 2<sup>31</sup> - 1).

### User-defined data types

Nếu theo nhu cấp sử dụng mà các kiểu dữ liệu <i>System-defined</i> là không đủ, thì phần lớn các ngôn ngữ lập trình sẽ cho phép chúng ta <i>defined</i> (định nghĩa) các kiểu dữ liệu riêng của chúng ta, và ta gọi đó là <b><i>user-defined data types</i></b>.

Dưới đây là một vì dụ về <i>User-defined data types</i> được triển khai trong C:

```
	struct User {
		int age;
		char[] name;
		...
	}
```

## Data Structures (Cấu trúc dữ liệu)

Để giải được biểu thức bên trên, ngoài trừ defined các variable thì chúng ta cần một "chiến thuật tổ chức" để sử dụng các variables một cách hiệu quả để giải quyết bài toán. Và ta gọi đó là <b><i>Data Structures (Cấu trúc dữ liệu)</i></b>.

Ta có thể định nghĩa <i>Data Structures</i> là cách thức để lưu trữ và tổ chức dữ liệu để có thể sử dụng các dữ liệu một cách hiệu quả.

Lựa vào cách thức định nghĩa cách tổ chức khi triển khai một Data Structure thì cơ bản ta có thể chia Data Structure ra thành 2 loại:

1. <b>Linear data structures</b>: các elements (phần từ) trong Data Structure sẽ được truy cập một cách tuần tự nhưng khi lưu trữ tất cả theo một cách tuần tự. Vd như: Linked List, Stacks và Queue.

2. <b>Non-linear data structures</b>: các elements sẽ được truy cập và lưu trữ một cách không tuần từ. Vd: Trees, Graphs.

## Abstract Data Types (ADTs) (Kiểu dữ liệu trừu tượng)

Như chúng ta đã biết, tất cả các kiểu dữ liệu <i>Primitive</i> đều được hỗ trợ các <i>operator</i> (toán tư) như <i>cộng</i> hoặc <i>trừ</i>.
Còn đối với các kiểu dữ liệu <i>user-defined</i>, chúng ta cần phải tự định nghĩa các operations cho chúng. Điều này có nghĩa là khi chúng ta defined một kiểu dữ liệu thì cần phải defined các operators đi kèm với nó.

Đó được gọi là Abstract Data Types (ADTs). Một ADT bao gồm 2 phần:

1. Declaration of data (Khai báo dữ liệu)
2. Declaration of operations (Khai báo các toán tử)

Các ADTs phổ biến có thể kể đến như: Linked Lists, Stacks, Queues, Priority Queues, Binary Trees, Dictionaries, Disjoint Sets (Union and Find), Hash Tables, Graphs,... 

Môt ví dụ như Stack. Stack sử dụng cơ chế LIFO (Last-In-First-Out). Element cuối cùng được `insert` vào `Stack` là element đầu tiên được `delete` ra ngoài. Các operator thường được implement của `Stack` là: `creating a stack` (tạo mới một stack), `pushing an element onto the stack` (đẩy một element vào stack), `popping an element from stack` (đẩy một element ra khỏi stack), `finding the current top of stack` (tìm phần tử đang ở đầu stack), `finding number of elements in the stack` (tìm số phần tử trong ngăn sếp),...

## Reference
- Books: Data Structures and Algorithms Made Easy (Narasimha Karumanchi)