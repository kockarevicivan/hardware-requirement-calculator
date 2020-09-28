function estimateHardware(users) {
	console.log(`========== ${users} users ==========`);
	
	const userRPS = 1;
	const requestDuration = 0.2; // In seconds.
	const maxRequestSizeInBytes = 53000;
	const maxSimultaneousRequestsPerUser = 5;

	// CPU
	function getCPUEstimate(
		simultaneousUsers,
		userRequestsPerSecond,
		requestDurationInSeconds) {
		
		let requiredRPS = simultaneousUsers * userRequestsPerSecond;
		let singleCoreInstanceRPS = 1 / requestDurationInSeconds;
		
		let requiredSingleCoreInstances = requiredRPS / singleCoreInstanceRPS;
		
		console.log(`\t\t1 core = ${requiredSingleCoreInstances} instances`);
		console.log(`\t\t2 core = ${requiredSingleCoreInstances / 2} instances`);
		console.log(`\t\t4 core = ${requiredSingleCoreInstances / 4} instances`);
		console.log(`\t\t8 core = ${requiredSingleCoreInstances / 8} instances`);
		console.log(`\t\t16 core = ${requiredSingleCoreInstances / 16} instances`);
		console.log(`\t\t32 core = ${requiredSingleCoreInstances / 32} instances`);
		console.log(`\t\t64 core = ${requiredSingleCoreInstances / 64} instances`);
	}
	
	// Standard performance tested (40% of users active at the moment, message every 3 seconds)
	console.log("\t40% users, message every 3 seconds");
	getCPUEstimate(users * 0.4, userRPS / 3, requestDuration);
	
	// Stress tested
	console.log("\t100% users, message every second");
	getCPUEstimate(users, userRPS, requestDuration);

	// RAM
	function getRAMEstimate (
		maxNumberOfUsers,
		maxSimultaneousRequestsPerUser,
		maxRequestSizeInBytes) {

		let maxRAMRequiredInGB = maxNumberOfUsers * maxSimultaneousRequestsPerUser * maxRequestSizeInBytes / (1024*1024*1024);

		console.log(`\tRAM required: ~${Math.ceil(maxRAMRequiredInGB)}GB`);
	}

	getRAMEstimate(users, maxSimultaneousRequestsPerUser, maxRequestSizeInBytes);

	// Disk
	function getDiskEstimate (
		maxNumberOfUsers,
		maxDataPerUserInBytes) {

		let maxDiskRequiredInGB = maxNumberOfUsers * maxDataPerUserInBytes / (1024*1024*1024);

		console.log(`\tDisk required: ~${Math.ceil(maxDiskRequiredInGB)}GB`);
	}

	getDiskEstimate(users, 200 * maxRequestSizeInBytes);
	
	console.log("\n");
}

estimateHardware(10000);
estimateHardware(1000);
estimateHardware(100);
