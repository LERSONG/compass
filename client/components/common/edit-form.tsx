import React from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {t} from "@lingui/macro";
import {Paper} from "@material-ui/core";
import {SubTitle} from "../layout/sub-title";
import {_i18n} from "../../i18n";
import {Input} from "../input";
import {FieldRule} from "./rule";

interface Props {
  resJson: any;
  fieldRuleMap?: Map<string, FieldRule>;
}

@observer
export class EditForm extends React.Component<Props> {
  @observable resJson: any = null;
  @observable fieldRuleMap: Map<string, FieldRule> = new Map<string, FieldRule>();

  componentDidMount() {
    this.resJson = this.props.resJson;
    this.fieldRuleMap = this.props.fieldRuleMap;
  }

  componentDidUpdate() {
    this.resJson = this.props.resJson;
  }

  onchange(value: string, keys: string) {
    console.log(keys,":",value)
    let evalStr = 'this.resJson';
    keys.split('-').forEach(item => {
      evalStr = `${evalStr}.${item}`;
    })
    eval(`${evalStr} = '${value}'`);
  }

  renderJson = (json: any, keys: string) => {
    return Object.keys(json).map((key: string, index: number) => {
      const keyStr = keys ? `${keys}-${key}` : key;
      let fieldRule = this.fieldRuleMap.get(keyStr);
      if (!fieldRule) {
        return
      }
      if (json[key] && typeof (json[key]) === 'object') {
        let elements = this.renderJson(json[key], keyStr);
        if (!elements){
          return
        }
        return  (
          <div key={`${keyStr}`}>
            <SubTitle title={_i18n._(t`${key}`)} />
            <Paper elevation={3} style={{ padding: 25 }}>
              {this.renderJson(json[key], keyStr)}
            </Paper>
          </div>
        )
      }
      let disabled = fieldRule.verbose === "edit"? false: true;
      return (
        <div key={`${keyStr}`}>
          <SubTitle title={_i18n._(t`${key}`)} />
          <Input
            required={fieldRule.require}
            disabled={disabled}
            placeholder={_i18n._(t`${key}`)}
            value={json[key]}
            onChange={(value) => this.onchange(value, keyStr)}
          />
        </div>
      )
    })
  }

  render() {
    return (
      <>
        {this.resJson ? this.renderJson(this.resJson, '') : '暂无数据'}
      </>
    )
  }
}