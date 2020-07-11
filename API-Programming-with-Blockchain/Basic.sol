pragma solidity 0.6.11;

contract Basic {
    uint256 x;

    function set(uint256 _x) public {
        x = _x;
    }

    function get() public view returns (uint256) {
        return x;
    }
}
