#include <iostream>
#include <functional>

using namespace std;
//lambda function
function<int(int)> createSumN(int n){
    return [n](int x){//caputre values, "=" capture all
        return x + n;
    } ;
}

int main(){
    int a= 4;

    function sum4 = createSumN(5);
    function sum5 = createSumN(5);
    cout << sum4(3) << endl;
    cout << sum5(3) << endl;
    return 0;
}