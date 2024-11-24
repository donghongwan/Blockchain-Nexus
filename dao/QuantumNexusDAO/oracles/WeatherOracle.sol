// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IWeatherDataProvider {
    function getWeatherData() external view returns (int256 temperature, uint256 humidity);
}

contract WeatherOracle {
    address public weatherDataProvider;
    int256 public latestTemperature;
    uint256 public latestHumidity;

    event WeatherDataUpdated(int256 temperature, uint256 humidity);

    constructor(address _weatherDataProvider) {
        weatherDataProvider = _weatherDataProvider;
    }

    function updateWeatherData() public {
        (latestTemperature, latestHumidity) = IWeatherDataProvider(weatherDataProvider).getWeatherData();
        emit WeatherDataUpdated(latestTemperature, latestHumidity);
    }

    function getLatestWeatherData() public view returns (int256, uint256) {
        return (latestTemperature, latestHumidity);
    }
}
