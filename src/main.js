/* Test */

class Person {
  constructor(fname, lname, age, address) {
    this.fname = fname;
    this.lname = lname;
    this.age = age;
    this.address = address;
  }

  get fullname() {
    return this.fname +"-"+this.lname;
  }
}

class Foo {
  log(msg) {
    console.log(msg)
  }
}

class Bar {
  print(msg) {
    document.write(msg)
  }
}

console.log("hello world!b7");