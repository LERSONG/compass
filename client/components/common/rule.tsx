export interface Rule {
    name?:string,
    fieldRule?: FieldRule,
    child?: Rule[]
}

export interface FieldRule {
    require?: boolean,
    verbose?: string,
    default?: any
}

export function RuleToMap(rules: Rule[], fieldPrefix: string): Map<string,FieldRule> {
    let fieldRuleMap = new Map<string,FieldRule>();
    if (!rules || rules.length === 0){
        return fieldRuleMap
    }
    rules.map(rule=>{
        fieldRuleMap.set(fieldPrefix + rule.name, rule.fieldRule)
        if (rule.child && rule.child.length > 0){

            let childMap = RuleToMap(rule.child,fieldPrefix + rule.name + "-");
            for (let [key, value] of childMap) {
                fieldRuleMap.set(key, value)
            }
        }
    })
    return fieldRuleMap
}