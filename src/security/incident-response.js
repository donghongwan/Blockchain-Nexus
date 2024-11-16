class IncidentResponse {
    constructor() {
        this.incidents = [];
    }

    logIncident(incident) {
        this.incidents.push(incident);
        console.log(`Incident logged: ${incident.description}`);
        this.executeResponsePlan(incident);
    }

    executeResponsePlan(incident) {
        // Placeholder for actual response plan logic
        console.log(`Executing response plan for incident: ${incident.description}`);
        // Example actions: notify team, isolate affected systems, etc.
    }

    getIncidents() {
        return this.incidents;
    }
}

module.exports = IncidentResponse;
