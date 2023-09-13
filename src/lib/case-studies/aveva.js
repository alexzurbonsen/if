'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EAvevaModel = void 0;
class EAvevaModel {
    constructor() {
    }
    /**
     * Defined for compatibility. Not used here.
     */
    authenticate(authParams) {
        this.authParams = authParams;
    }
    /**
     *  Configures the TEADS Plugin for IEF
     *  @param {string} name name of the resource
     *  @param {Object} staticParams static parameters for the resource
     */
    async configure(name, staticParams = undefined) {
        this.name = name;
        if (staticParams === undefined) {
            throw new Error('Required Parameters not provided');
        }
        return this;
    }
    /**
     * Calculate the total emissions for a list of observations
     *
     * Each Observation require:
     *  @param {Object[]} observations
     *  @param {number} observations[].time time to normalize to in hours
     *  @param {number} observations[].pb percentage mem usage
     *  @param {number} observations[].pl percentage mem usage
     */
    async calculate(observations) {
        if (observations === undefined) {
            throw new Error('Required Parameters not provided');
        } else if (!Array.isArray(observations)) {
            throw new Error('Observations must be an array');
        }
        return observations.map(observation => {
            this.configure(this.name, observation);
            observation['e-cpu'] = this.calculateEnergy(observation);
            return observation;
        });
    }
    /**
     * Returns model identifier
     */
    modelIdentifier() {
        return 'e-aveva';
    }
    /**
     * Calculates the energy consumption for a single observation
     * requires
     *
     * mem-util: ram usage in percentage
     * timestamp: RFC3339 timestamp string
     *
     * multiplies memory used (GB) by a coefficient (wh/GB) and converts to kwh
     */
    calculateEnergy(observation) {
        if (!('pl' in observation) || !('pb' in observation) || !('time' in observation)) {
            throw new Error(
                'Required Parameters pl, pb, time not provided for observation'
            );
        }
        const pl = observation['pl'];
        const pb = observation['pb'];
        const time = observation['time'];

        return ((pl - pb) * time) / 1000;
    }
}
exports.EAvevaModel = EAvevaModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1lbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVtZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsTUFBYSxTQUFTO0lBQXRCO1FBS0UsaUNBQWlDO1FBQ2pDLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQixpREFBaUQ7UUFDakQsaUJBQVksR0FBRyxDQUFDLENBQUM7SUFxR25CLENBQUM7SUFwR0M7O09BRUc7SUFDSCxZQUFZLENBQUMsVUFBa0I7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQ2IsSUFBWSxFQUNaLGVBQW1DLFNBQVM7UUFFNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztTQUNyRDtRQUVELElBQUksV0FBVyxJQUFJLFlBQVksRUFBRTtZQUMvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBVyxDQUFDO1NBQzdEO1FBRUQsSUFBSSxZQUFZLElBQUksWUFBWSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBVyxDQUFDO1NBQzFEO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsWUFBMkM7UUFDekQsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztTQUNyRDthQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNsRDtRQUNELE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQXlCLEVBQUUsRUFBRTtZQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDeEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekQsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxlQUFlO1FBQ2IsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ssZUFBZSxDQUFDLFdBQXlCO1FBQy9DLElBQUksQ0FBQyxDQUFDLFVBQVUsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxFQUFFO1lBQ2pFLE1BQU0sSUFBSSxLQUFLLENBQ2IsOEVBQThFLENBQy9FLENBQUM7U0FDSDtRQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLENBQUMsRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUNiLHlEQUF5RCxDQUMxRCxDQUFDO1NBQ0g7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQ2IsMERBQTBELENBQzNELENBQUM7U0FDSDtRQUVELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUN4QyxxQ0FBcUM7UUFDckMsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztTQUN4RDtRQUVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFckMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDNUQsQ0FBQztDQUNGO0FBN0dELDhCQTZHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUltcGFjdE1vZGVsSW50ZXJmYWNlfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7S2V5VmFsdWVQYWlyfSBmcm9tICcuLi8uLi90eXBlcy9ib2F2aXp0YSc7XG5cbmV4cG9ydCBjbGFzcyBFTWVtTW9kZWwgaW1wbGVtZW50cyBJSW1wYWN0TW9kZWxJbnRlcmZhY2Uge1xuICAvLyBEZWZpbmVkIGZvciBjb21wYXRpYmlsaXR5LiBOb3QgdXNlZCBpbiBURUFEUy5cbiAgYXV0aFBhcmFtczogb2JqZWN0IHwgdW5kZWZpbmVkO1xuICAvLyBuYW1lIG9mIHRoZSBkYXRhIHNvdXJjZVxuICBuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIC8vIHRkcCBvZiB0aGUgY2hpcCBiZWluZyBtZWFzdXJlZFxuICBtZW1vcnlBbGxvY2F0aW9uID0gMDtcbiAgLy8gZGVmYXVsdCBwb3dlciBjdXJ2ZSBwcm92aWRlZCBieSB0aGUgVGVhZHMgVGVhbVxuICBtZW1vcnlFbmVyZ3kgPSAwO1xuICAvKipcbiAgICogRGVmaW5lZCBmb3IgY29tcGF0aWJpbGl0eS4gTm90IHVzZWQgaW4gVEVBRFMuXG4gICAqL1xuICBhdXRoZW50aWNhdGUoYXV0aFBhcmFtczogb2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5hdXRoUGFyYW1zID0gYXV0aFBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiAgQ29uZmlndXJlcyB0aGUgVEVBRFMgUGx1Z2luIGZvciBJRUZcbiAgICogIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIHJlc291cmNlXG4gICAqICBAcGFyYW0ge09iamVjdH0gc3RhdGljUGFyYW1zIHN0YXRpYyBwYXJhbWV0ZXJzIGZvciB0aGUgcmVzb3VyY2VcbiAgICogIEBwYXJhbSB7bnVtYmVyfSBzdGF0aWNQYXJhbXMudGRwIFRoZXJtYWwgRGVzaWduIFBvd2VyIGluIFdhdHRzXG4gICAqICBAcGFyYW0ge0ludGVycG9sYXRpb259IHN0YXRpY1BhcmFtcy5pbnRlcnBvbGF0aW9uIEludGVycG9sYXRpb24gbWV0aG9kXG4gICAqL1xuICBhc3luYyBjb25maWd1cmUoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHN0YXRpY1BhcmFtczogb2JqZWN0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXG4gICk6IFByb21pc2U8SUltcGFjdE1vZGVsSW50ZXJmYWNlPiB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgIGlmIChzdGF0aWNQYXJhbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlZCBQYXJhbWV0ZXJzIG5vdCBwcm92aWRlZCcpO1xuICAgIH1cblxuICAgIGlmICgnbWVtLWFsbG9jJyBpbiBzdGF0aWNQYXJhbXMpIHtcbiAgICAgIHRoaXMubWVtb3J5QWxsb2NhdGlvbiA9IHN0YXRpY1BhcmFtc1snbWVtLWFsbG9jJ10gYXMgbnVtYmVyO1xuICAgIH1cblxuICAgIGlmICgnbWVtLWVuZXJneScgaW4gc3RhdGljUGFyYW1zKSB7XG4gICAgICB0aGlzLm1lbW9yeUVuZXJneSA9IHN0YXRpY1BhcmFtc1snbWVtLWVuZXJneSddIGFzIG51bWJlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIHRvdGFsIGVtaXNzaW9ucyBmb3IgYSBsaXN0IG9mIG9ic2VydmF0aW9uc1xuICAgKlxuICAgKiBFYWNoIE9ic2VydmF0aW9uIHJlcXVpcmU6XG4gICAqICBAcGFyYW0ge09iamVjdFtdfSBvYnNlcnZhdGlvbnNcbiAgICogIEBwYXJhbSB7c3RyaW5nfSBvYnNlcnZhdGlvbnNbXS50aW1lc3RhbXAgUkZDMzMzOSB0aW1lc3RhbXAgc3RyaW5nXG4gICAqICBAcGFyYW0ge251bWJlcn0gb2JzZXJ2YXRpb25zW10ubWVtLXV0aWwgcGVyY2VudGFnZSBtZW0gdXNhZ2VcbiAgICovXG4gIGFzeW5jIGNhbGN1bGF0ZShvYnNlcnZhdGlvbnM6IG9iamVjdCB8IG9iamVjdFtdIHwgdW5kZWZpbmVkKTogUHJvbWlzZTxhbnlbXT4ge1xuICAgIGlmIChvYnNlcnZhdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlZCBQYXJhbWV0ZXJzIG5vdCBwcm92aWRlZCcpO1xuICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkob2JzZXJ2YXRpb25zKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdPYnNlcnZhdGlvbnMgbXVzdCBiZSBhbiBhcnJheScpO1xuICAgIH1cbiAgICByZXR1cm4gb2JzZXJ2YXRpb25zLm1hcCgob2JzZXJ2YXRpb246IEtleVZhbHVlUGFpcikgPT4ge1xuICAgICAgdGhpcy5jb25maWd1cmUodGhpcy5uYW1lISwgb2JzZXJ2YXRpb24pO1xuICAgICAgb2JzZXJ2YXRpb25bJ2UtbWVtJ10gPSB0aGlzLmNhbGN1bGF0ZUVuZXJneShvYnNlcnZhdGlvbik7XG4gICAgICByZXR1cm4gb2JzZXJ2YXRpb247XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBtb2RlbCBpZGVudGlmaWVyXG4gICAqL1xuICBtb2RlbElkZW50aWZpZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ2UtbWVtJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBlbmVyZ3kgY29uc3VtcHRpb24gZm9yIGEgc2luZ2xlIG9ic2VydmF0aW9uXG4gICAqIHJlcXVpcmVzXG4gICAqXG4gICAqIG1lbS11dGlsOiByYW0gdXNhZ2UgaW4gcGVyY2VudGFnZVxuICAgKiB0aW1lc3RhbXA6IFJGQzMzMzkgdGltZXN0YW1wIHN0cmluZ1xuICAgKlxuICAgKiBtdWx0aXBsaWVzIG1lbW9yeSB1c2VkIChHQikgYnkgYSBjb2VmZmljaWVudCAod2gvR0IpIGFuZCBjb252ZXJ0cyB0byBrd2hcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlRW5lcmd5KG9ic2VydmF0aW9uOiBLZXlWYWx1ZVBhaXIpIHtcbiAgICBpZiAoISgnbWVtLXV0aWwnIGluIG9ic2VydmF0aW9uKSB8fCAhKCd0aW1lc3RhbXAnIGluIG9ic2VydmF0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnUmVxdWlyZWQgUGFyYW1ldGVycyBkdXJhdGlvbixjcHUtdXRpbCx0aW1lc3RhbXAgbm90IHByb3ZpZGVkIGZvciBvYnNlcnZhdGlvbidcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1lbW9yeUFsbG9jYXRpb24gPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1JlcXVpcmVkIFBhcmFtZXRlcjogbWVtLWFsbG9jIG5vdCBwcm92aWRlZCBpbiBjb25maWd1cmUnXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5tZW1vcnlFbmVyZ3kgPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1JlcXVpcmVkIFBhcmFtZXRlcjogbWVtLWVuZXJneSBub3QgcHJvdmlkZWQgaW4gY29uZmlndXJlJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZW1fYWxsb2MgPSB0aGlzLm1lbW9yeUFsbG9jYXRpb247XG4gICAgLy8gICAgY29udmVydCBjcHUgdXNhZ2UgdG8gcGVyY2VudGFnZVxuICAgIGNvbnN0IG1lbV91dGlsID0gb2JzZXJ2YXRpb25bJ21lbS11dGlsJ107XG4gICAgaWYgKG1lbV91dGlsIDwgMCB8fCBtZW1fdXRpbCA+IDEwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcHUgdXNhZ2UgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMCcpO1xuICAgIH1cblxuICAgIGNvbnN0IG1lbV9lbmVyZ3kgPSB0aGlzLm1lbW9yeUVuZXJneTtcblxuICAgIHJldHVybiAobWVtX2FsbG9jICogKG1lbV91dGlsIC8gMTAwKSAqIG1lbV9lbmVyZ3kpIC8gMTAwMDtcbiAgfVxufVxuIl19
