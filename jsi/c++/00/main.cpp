#include <iostream> // c++ standtard library, preprocessor include and replace in on code

#if _POSIX_C_SOURCE // statement
    int foo = 4;
#else
    int foo = 10;
#endif

int main(){
    std::cout << "Hello, World!";
    return 0;
}