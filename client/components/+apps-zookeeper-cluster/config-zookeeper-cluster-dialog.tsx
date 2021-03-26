import React from "react";
import {observer} from "mobx-react";
import {Dialog, DialogProps} from "../dialog";
import {observable} from "mobx";
import {Wizard, WizardStep} from "../wizard";
import {Trans} from "@lingui/macro";
import {Notifications} from "../notifications";
import {EditForm} from '../common/edit-form';
import {ZookeeperCluster, zookeeperClusterApi} from "../../api/endpoints/zookeeper-cluster.api";
import {RuleToMap} from "../common/rule";
import {ConfigZookeeperClusterRules} from "./zookeeper-cluster.rule";


interface Props extends Partial<DialogProps> {
}

@observer
export class ConfigZookeeperClusterDialog extends React.Component<Props> {

  @observable static isOpen = false;
  @observable static data: ZookeeperCluster = null;
  @observable resJson: Partial<ZookeeperCluster> = null;
  private eleRef = React.createRef<EditForm>();

  static open(object: ZookeeperCluster) {
    ConfigZookeeperClusterDialog.isOpen = true;
    ConfigZookeeperClusterDialog.data = object;
  }

  static close() {
    ConfigZookeeperClusterDialog.isOpen = false;
  }

  reset = () => {
    this.resJson = null;
  }

  close = () => {
    ConfigZookeeperClusterDialog.close();
  }

  get zookeeperCluster(){
    return ConfigZookeeperClusterDialog.data
  }

  updateZookeeperCluster = async () => {
    try {
      console.log('resJson', this.eleRef.current.resJson);
      this.zookeeperCluster.spec = this.resJson.spec
      if(typeof(this.zookeeperCluster.spec.replicas) == "string"){
        this.zookeeperCluster.spec.replicas = Number.parseInt(this.zookeeperCluster.spec.replicas)
      }
      let name = this.resJson.metadata.name;
      let namespace = this.resJson.metadata.namespace;
      await zookeeperClusterApi.update({name, namespace},this.zookeeperCluster)
          .then(()=>{
            Notifications.ok(
                <>Config save succeeded</>
            );
          })
      this.reset();
      this.close();
    } catch (err) {
      Notifications.error(err);
    }
  }

  onOpen = async () => {
    console.log("data:",this.zookeeperCluster)
    this.resJson = {
      metadata: this.zookeeperCluster.metadata,
      spec: this.zookeeperCluster.spec
    }

  }

  render() {
    const { ...dialogProps } = this.props;
    const header = <h5><Trans>Config ZookeeperCluster</Trans></h5>;
    let fieldRuleMap = RuleToMap(ConfigZookeeperClusterRules,"");
    console.log("fieldRuleMap:",fieldRuleMap)
    return (
      <Dialog
        {...dialogProps}
        className="ConfigZookeeperClusterDialog"
        isOpen={ConfigZookeeperClusterDialog.isOpen}
        onOpen={this.onOpen}
        close={this.close}
      >
        <Wizard header={header} done={this.close}>
          <WizardStep contentClass="flow column" nextLabel={<Trans>Update</Trans>} next={this.updateZookeeperCluster}>
            <EditForm
              ref={this.eleRef}
              resJson={this.resJson}
              fieldRuleMap={fieldRuleMap}
            />
          </WizardStep>
        </Wizard>
      </Dialog>
    )
  }
}