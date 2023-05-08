#include <iostream>
#include <vector>
#include <map>
#include <string>

struct MyStruct{
    std::string message;
    int age;
};

//pass by reference memory
int sumDangerous(int &a){
    return a + 4;
}
//pass by value
int sum(int a){
    return a + 4;
}

int main(){

    auto myVar = 4; // inference to int

    std::vector<int> myVec;
    myVec.push_back(4);
    myVec.push_back(2);

    std::map<std::string,std::string> myMap = std::map<std::string,std::string>();

    myMap["Hello"] = "World";


   struct MyStruct myExampleStruct = {
    "Hello",
    23};

    std::cout << "Hello, Word"<< std::endl;;
    std::cout << myExampleStruct.message << myExampleStruct.age<< std::endl;;

    int age = 25;
    int *pAge = &age;
    std::cout << "age: "<< &age << std::endl;
    std::cout << "pointer age: "<< &pAge << std::endl;
    std::cout << "age: "<< sumDangerous(age) << std::endl;
    std::cout << "age: "<< age << std::endl;
    std::cout << "age: "<< sum(age) << std::endl;
    std::cout << "age: "<< age << std::endl;



    return 0;

}