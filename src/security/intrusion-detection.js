const EventEmitter = require('events');

class IntrusionDetection extends EventEmitter {
    constructor() {
        super();
        this.suspiciousActivities = [];
    }

    monitorActivity(activity) {
        // Simple heuristic for detecting suspicious activity
        if (this.isSuspicious(activity)) {
            this.suspiciousActivities.push(activity);
            this.emit('alert', `Suspicious activity detected: ${activity}`);
        }
    }

    isSuspicious(activity) {
        // Placeholder for actual detection logic
        return activity.includes('failed login') || activity.includes('unusual IP');
    }

    getSuspiciousActivities() {
        return this.suspiciousActivities;
    }
}

module.exports = IntrusionDetection;
