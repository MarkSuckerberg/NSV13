import { useBackend } from '../backend';
import { Button, Section, ProgressBar, LabeledList, Box } from '../components';
import { Fragment } from 'inferno';

export const FighterMaintenance = props => {
  const { act, data } = useBackend(props);
  return (
    <Window resizable>
      <Window.Content scrollable>
        <Button
          icon={data.master_caution ? "warning" : "square-o"}
          style={data.master_caution ? "caution" : "disabled"}
          onClick={() => act('master_caution')}
          content="Master Caution"/>
        <Button
          onClick={() => act('show_dradis')}
          content="Show Dradis"/>
        <Button
          icon={data.current_countermeasures ? "warning" : "square-o"}
          style={data.current_countermeasures ? "caution" : "disabled"}
          onClick={() => act('deploy_countermeasure')}
          content="Master Caution"/>
        <Section title="Ignition Controls">
          {(data.flight_state < 6) && (
            <Fragment>
              <Button
                icon={data.ignition ? "power-off" : "square-o"}
                style={data.ignition ? "selected" : null}
                onClick={() => act('ignition')}
                content="I1 = Master Ignition Toggle"/>
              <Button
                icon={data.fuel_pump ? "power-off" : "square-o"}
                style={data.fuel_pump ? "selected" : null}
                onClick={() => act('fuel_pump')}
                content="I2 - Fuel Pump"/>
              <Button
                icon={data.battery ? "power-off" : "square-o"}
                style={data.battery ? "selected" : null}
                onClick={() => act('battery')}
                content="I3 - Battery"/>
              <Button
                icon={data.apu ? "power-off" : "square-o"}
                style={data.apu ? "selected" : null}
                onClick={() => act('apu')}
                content="I4 - APU"/>
            </Fragment>
          )}
          <Button
            icon={data.throttle_lock ? "power-off" : "square-o"}
            style={data.throttle_lock ? "selected" : null}
            onClick={() => act('throttle_lock')}
            content="I5 - Throttle Lock"/>
          <Button
            icon="power-off"
            style="caution"
            onClick={() => act('shutdown')}
            content="I6 - Shutdown"/>
        </Section>
        <Section title="Flight Ops">
          <Button
            icon={data.docking_mode ? "power-off" : "square-o"}
            style={data.docking_mode ? "selected" : null}
            onClick={() => act('docking_mode')}
            content="O1 - Docking Mode"/>
          <Button
            icon={data.canopy_lock ? "power-off" : "square-o"}
            style={data.canopy_lock ? "selected" : null}
            onClick={() => act('canopy_lock')}
            content="O2 - Canopy Lock"/>
          <Button
            icon={data.brakes ? "power-off" : "square-o"}
            style={data.brakes ? "selected" : null}
            onClick={() => act('brakes')}
            content="O3 - Inertial Damper (Not dampener, because why would we make inertia wet? Poor inertia. Also Pucegang rules.)"/>
          <Button
            icon={data.mag_locked ? "power-off" : "square-o"}
            style={data.mag_locked ? "selected" : null}
            onClick={() => act('mag_release')}
            content="O4 - Release Mag-cat Lock"/>
          <Button
            icon={data.weapon_safety ? "power-off" : "square-o"}
            style={data.weapon_safety ? "selected" : null}
            onClick={() => act('weapon_safety')}
            content="W1 - Weapon Safeties"/>
          <Button
            icon={data.target_lock ? "power-off" : "square-o"}
            style={data.target_lock ? "selected" : null}
            onClick={() => act('target_lock')}
            content="W2 - Target Lock"/>
          <Button
            icon="square-o"
            style="caution"
            onClick={() => act('eject')}
            content="W3 - Eject"/>
        </Section>
        <Section title="Statistics">
          <LabeledList>
            <LabeledList.Item label="Hull Integrity">
              <ProgressBar
                value={data.integrity}
                maxvalue={data.max_integrity}/>
            </LabeledList.Item>
            <LabeledList.Item label="Fuel Level">
              <ProgressBar
                value={data.fuel}
                maxvalue={data.max_fuel}/>
            </LabeledList.Item>
            <LabeledList.Item label="Countermeasure Charges">
              <ProgressBar
                value={data.current_countermeasures}
                maxvalue={data.max_countermeasures}/>
            </LabeledList.Item>
            {data.max_passengers && (
              <LabeledList.Item label="Passengers">
                <ProgressBar
                  value={data.passengers}
                  maxvalue={data.max_passengers}/>
              </LabeledList.Item>
            )}
            {data.max_aux_fuel && (
              <LabeledList.Item label="Auxiliary Fuel Level">
                <ProgressBar
                  value={data.aux_fuel}
                  maxvalue={data.max_aux_fuel}/>
              </LabeledList.Item>
            )}
            {data.max_passengers && (
              <Fragment>
                <LabeledList.Item label="RBS Welder Fuel Level">
                  <ProgressBar
                    value={data.rbs_welder}
                    maxvalue={data.max_rbs}/>
                </LabeledList.Item>
                <LabeledList.Item label="RBS Foamer Tank Level">
                  <ProgressBar
                    value={data.rbs_foamer}
                    maxvalue={data.max_rbs}/>
                </LabeledList.Item>
              </Fragment>
            )}
            {data.max_torpedoes && (
              <LabeledList.Item label="Torpedoes">
                <ProgressBar
                  value={data.current_torpedoes}
                  maxvalue={data.max_torpedoes}/>
              </LabeledList.Item>
            )}
            {data.max_missiles && (
              <LabeledList.Item label="Missiles">
                <ProgressBar
                  value={data.current_missiles}
                  maxvalue={data.max_missiles}/>
              </LabeledList.Item>
            )}
          </LabeledList>
        </Section>
        {data.ftl_capable && (
          <Section title="FTL Drive">
            <Section title="Integrated FTL Computer">
              <ProgressBar
                value={data.ftl_progress}
                maxvalue={data.ftl_goal}
                ranges={{
                  good: [data.ftl_goal, Infinity],
                }}/>
            </Section>
            <LabeledList>
              {data.ships.map(ship => (
                <LabeledList.Item label={ship.name}>
                  <Button
                    icon="arrow-right"
                    onClick={() => act('jump', {
                      ship_id: ship.ship_id,
                    })}
                    tooltip="({{distance}}ly away)"
                    content="Initiate Jump"
                    disabled={!ship.can_jump}/>
                </LabeledList.Item>
            ))}
            </LabeledList>
          </Section>
        )}
        {data.has_cargo && (
          <Section title="Cargo Hold">
            <ProgressBar
              value={data.cargo}
              maxvalue={data.max_cargo}
              ranges={{
                average: [data.max_cargo, Infinity],
              }}/>
            <LabeledList>
              {data.cargo_info.map(cargo => (
                <LabeledList.Item label={cargo.name}>
                  <Button
                    icon="eject"
                    onClick={() => act('unload_cargo', {
                      crate_id: crate.crate_id,
                    })}
                    tooltip={contents}
                    content="Initiate Jump"
                    disabled={!cargo.can_unload}/>
                </LabeledList.Item>
              ))}
            </LabeledList>
          </Section>
        )}
      </Window.Content>
    </Window>
  );
};
