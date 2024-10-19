#include<iostream>
#include<vector>
using namespace std;
int solve(int n,vector<int>dp) {
    //base case
    if(n==0)
        return 0;
    //check dp
    if(dp[n]!=-1)
        return dp[n];
    int ans = n;
    for(int i = 1; i*i<=n; i++) {
        ans = min(ans,1+solve(n-i*i,dp));
    }
    //store ans in dp
    return dp[n] = ans;
}
// Tabular DP
int tab(int n) {
    vector<int>dp(n+1,INT_MAX);
    //according to base case
    dp[0]=0;
    for(int i = 1; i<=n; i++) {
        for(int j = 1; j*j<=n; j++) {
        int temp = j*j;
        //Handle negative case
        if(i-temp>=0)
            dp[i] = min(dp[i],1+dp[i-temp]);
        }
    }
    return dp[n];
}
int main()
{
    int n=12;
    cout<<"Enter ten number"<<endl;
    cin>>n;
    vector<int>dp(n+1,-1);
    int ans = solve(n,dp);
    int ans1 = tab(n);
    cout<<"tabular ans is -> "<<ans1<<endl;
    cout<<"Top down ans is -> "<<ans<<endl;
    return 0;
}
