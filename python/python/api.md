# 速查手册

<style>td:first-child{ color: red; } td:first-child em { color: gray; }</style>


## Python Keywords

|||
|---------------|----------------------------------------------
| if       | To make a conditional statement
| elif     | Used in conditional statements, same as else if
| else     | Used in conditional statements
| finally  | Used with exceptions, a block of code that will be executed no matter if there is an exception or not
| for      | To create a for loop
| while    | To create a while loop
| break    | To break out of a loop
| continue | To continue to the next iteration of a loop
|||
| and      | A logical operator
| or       | A logical operator
| in       | To check if a value is present in a list, tuple, etc.
| not      | A logical operator
| is       | To test if two variables are equal
|||
| True     | Boolean value, result of comparison operations
| False    | Boolean value, result of comparison operations
| None     | Represents a null value
|||
| def      | To define a function
| return   | To exit a function and return a value
| lambda   | To create an anonymous function
| yield    | To end a function, returns a generator
| from     | To import specific parts of a module
| import   | To import a module
| as       | To create an alias
| class    | To define a class
|||
| try      | To make a try...except statement
| except   | Used with exceptions, what to do when an exception occurs
| raise    | To raise an exception
| with     | Used to simplify exception handling
|||
| global   | To declare a global variable
| nonlocal | To declare a non-local variable
| assert   |  For debugging
| del      | To delete an object
| pass     | A null statement, a statement that will do nothing


## Built in Functions

|||
|---------------|----------------------------------------------
| str()         | Returns a string object
| type()        | Returns the type of an object
| sorted()      | Returns a sorted list
| reversed()    | Returns a reversed iterator
| len()         | Returns the length of an object
| range()       | Returns a sequence of numbers, starting from 0 and increments by 1 (by default)
| bool()        | Returns the boolean value of the specified object
| print()       | Prints to the standard output device
|||
| bytes()       | Returns a bytes object
| int()         | Returns an integer number
| float()       | Returns a floating point number
| list()        | Returns a list
| set()         | Returns a new set object
| dict()        | Returns a dictionary (Array)
| tuple()       | Returns a tuple
| iter()        | Returns an iterator object
| object()      | Returns a new object
|||
| all()         | Returns True if all items in an iterable object are true
| any()         | Returns True if any item in an iterable object is true
| ascii()       | Returns a readable version of an object. Replaces none-ascii characters with escape character
| chr()         | Returns a character from the specified Unicode code.
| bin()         | Returns the binary version of a number
| bytearray()   | Returns an array of bytes
| callable()    | Returns True if the specified object is callable, otherwise False
| classmethod() | Converts a method into a class method
| compile()     | Returns the specified source as an object, ready to be executed
| complex()     | Returns a complex number
| delattr()     | Deletes the specified attribute (property or method) from the specified object
| dir()         | Returns a list of the specified object's properties and methods
| divmod()      | Returns the quotient and the remainder when argument1 is divided by argument2
| enumerate()   | Takes a collection (e.g. a tuple) and returns it as an enumerate object
| eval()        | Evaluates and executes an expression
| exec()        | Executes the specified code (or object)
| filter()      | Use a filter function to exclude items in an iterable object
| format()      | Formats a specified value
| frozenset()   | Returns a frozenset object
| getattr()     | Returns the value of the specified attribute (property or method)
| globals()     | Returns the current global symbol table as a dictionary
| hasattr()     | Returns True if the specified object has the specified attribute (property/method)
| hash()        | Returns the hash value of a specified object
| help()        | Executes the built-in help system
| hex()         | Converts a number into a hexadecimal value
| id()          | Returns the id of an object
| input()       | Allowing user input
| isinstance()  | Returns True if a specified object is an instance of a specified object
| issubclass()  | Returns True if a specified class is a subclass of a specified object
| locals()      | Returns an updated dictionary of the current local symbol table
| map()         | Returns the specified iterator with the specified function applied to each item
|||
| abs()         | Returns the absolute value of a number
| min()         | Returns the smallest item in an iterable
| max()         | Returns the largest item in an iterable
| sum()         | Sums the items of an iterator
| pow()         | Returns the value of x to the power of y
| round()       | Rounds a numbers
|||
| memoryview()  | Returns a memory view object
| next()        | Returns the next item in an iterable
| oct()         | Converts a number into an octal
| open()        | Opens a file and returns a file object
| ord()         | Convert an integer representing the Unicode of the specified character
| property()    | Gets, sets, deletes a property
| repr()        | Returns a readable version of an object
| setattr()     | Sets an attribute (property/method) of an object
| slice()       | Returns a slice object
| @staticmethod() | Converts a method into a static method
| vars()        | Returns the `__dict__` property of an object
| zip()         | Returns an iterator, from two or more iterators


## String Methods

> Note: All string methods returns new values. They do not change the original string.

|||
|---------------|--------------------------------------------------
| upper()       | Converts a string into upper case
| lower()       | Converts a string into lower case
| title()       | Converts the first character of each word to upper case
| split()       | Splits the string at the specified separator, and returns a list
| lstrip()      | Returns a left trim version of the string
| rstrip()      | Returns a right trim version of the string
|||
| capitalize()  | Converts the first character to upper case
| casefold()    | Converts string into lower case
| center()      | Returns a centered string
| count()       | Returns the number of times a specified value occurs in a string
| encode()      | Returns an encoded version of the string
| endswith()    | Returns true if the string ends with the specified value
| expandtabs()  | Sets the tab size of the string
| find()        | Searches the string for a specified value and returns the position of where it was found
| format()      | Formats specified values in a string
| format_map()  | Formats specified values in a string
| index()       | Searches the string for a specified value and returns the position of where it was found
| isalnum()     | Returns True if all characters in the string are alphanumeric
| isalpha()     | Returns True if all characters in the string are in the alphabet
| isdecimal()   | Returns True if all characters in the string are decimals
| isdigit()     | Returns True if all characters in the string are digits
| isidentifier()| Returns True if the string is an identifier
| islower()     | Returns True if all characters in the string are lower case
| isnumeric()   | Returns True if all characters in the string are numeric
| isprintable() | Returns True if all characters in the string are printable
| isspace()     | Returns True if all characters in the string are whitespaces
| istitle()     | Returns True if the string follows the rules of a title
| isupper()     | Returns True if all characters in the string are upper case
| join()        | Joins the elements of an iterable to the end of the string
| ljust()       | Returns a left justified version of the string
| maketrans()   | Returns a translation table to be used in translations
| partition()   | Returns a tuple where the string is parted into three parts
| replace()     | Returns a string where a specified value is replaced with a specified value
| rfind()       | Searches the string for a specified value and returns the last position of where it was found
| rindex()      | Searches the string for a specified value and returns the last position of where it was found
| rpartition()  | Returns a tuple where the string is parted into three parts
| rsplit()      | Splits the string at the specified separator, and returns a list
| splitlines()  | Splits the string at line breaks and returns a list
| startswith()  | Returns true if the string starts with the specified value
| swapcase()    | Swaps cases, lower case becomes upper case and vice versa
| translate()   | Returns a translated string
| zfill()       | Fills the string with a specified number of 0 values at the beginning


## List/Array Methods

|||
|-----------|-------------------------
| append()  | Adds an element at the end of the list
| insert()  | Adds an element at the specified position
| pop()     | Removes the element at the specified position
| remove()  | Removes the first item with the specified value
| clear()   | Removes all the elements from the list
| extend()  | Add the elements of a list (or any iterable), to the end of the current list
| sort()    | Sorts the list
| reverse() | Reverses the order of the list
| count()   | Returns the number of elements with the specified value
| index()   | Returns the index of the first element with the specified value
| copy()    | Returns a copy of the list


## Dictionary Methods

|||
|------------|-------------------------
| clear()    | Removes all the elements from the dictionary
| copy()     | Returns a copy of the dictionary
| fromkeys() | Returns a dictionary with the specified keys and values
| get()      | Returns the value of the specified key
|||
| keys()     | Returns a list containing the dictionary's keys
| values() | Returns a list of all the values in the dictionary
| items()    | Returns a list containing a tuple for each key value pair
|||
| pop()      | Removes the element with the specified key
| popitem()  | Removes the last inserted key-value pair
|||
| setdefault() | Returns the value of the specified key. If the key does not exist: insert the key, with the specified value
| update() | Updates the dictionary with the specified key-value pairs


## Tuple Methods

|||
|---------|-------------------------
| count() | Returns the number of times a specified value occurs in a tuple
| index() | Searches the tuple for a specified value and returns the position of where it was found


## Set Methods

|||
|--------------|-----------------------------------------------------------------
| add()        | Adds an element to the set
| pop()        | Removes an element from the set
| remove()     | Removes the specified element
| clear()      | Removes all the elements from the set
|||
| copy()       | Returns a copy of the set
| difference() | Returns a set containing the difference between two or more sets
| difference_update()   | Removes the items in this set that are also included in another, specified set
| discard()             | Remove the specified item
| intersection()        | Returns a set, that is the intersection of two other sets
| intersection_update() | Removes the items in this set that are not present in other, specified set(s)
| isdisjoint() | Returns whether two sets have a intersection or not
| issubset()   | Returns whether another set contains this set or not
| issuperset() | Returns whether this set contains another set or not
| symmetric_difference()        | Returns a set with the symmetric differences of two sets
| symmetric_difference_update() | inserts the symmetric differences from this set and another
| union()      | Return a set containing the union of sets
| update()     | Update the set with the union of this set and others
