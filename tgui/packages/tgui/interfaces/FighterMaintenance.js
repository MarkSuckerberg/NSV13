import { useBackend } from '../backend';
import { Button, Section, ProgressBar, LabeledList } from '../components';

export const FighterMaintenance = props => {
  const { act, data } = useBackend(props);
  return (
    <Window>
      <Window.Content scrollable>
        <Section title="Statistics">
          <LabeledList>
            <LabeledList.Item label="Hull Integrity">
              <ProgressBar value={data.integrity} maxvalue={data.max_integrity}/>
            </LabeledList.Item>
            <LabeledList.Item label="Fuel Level">
              <ProgressBar value={data.fuel} maxvalue={data.max_integrity}/>
            </LabeledList.Item>
            <LabeledList.Item label="Countermeasure Charge">
              <ProgressBar value={data.current_countermeasures} maxvalue={data.max_countermeasures}/>
            </LabeledList.Item>
          </LabeledList>
        </Section>
        <Section title="Components">
          <LabeledList>
            <LabeledList.Item label="Armour Plating">
              <Button
                icon={data.c_armour_plating ? "eject" : "chevron-down"}
                onClick={() => act('component_armour_plating')}
                selected={data.c_armour_plating}/>
            </LabeledList.Item>
            <LabeledList.Item label="Auxillary Power Unit">
              <Button
                icon={data.data.c_apu ? "eject" : "chevron-down"}
                onClick={() => act('component_apu')}
                selected={data.data.c_apu}/>
            </LabeledList.Item>
            <LabeledList.Item label="Avionics">
              <Button
                icon={data.data.c_avionics ? "eject" : "chevron-down"}
                onClick={() => act('component_avionics')}
                selected={data.data.c_avionics}/>
            </LabeledList.Item>
            <LabeledList.Item label="Countermeasure Dispenser">
              <Button
                icon={data.data.c_countermeasure_dispenser ? "eject" : "chevron-down"}
                onClick={() => act('component_countermeasure_dispenser')}
                selected={data.data.c_countermeasure_dispenser}/>
            </LabeledList.Item>
            <LabeledList.Item label="Engine">
              <Button
                icon={data.data.c_engine ? "eject" : "chevron-down"}
                onClick={() => act('component_engine')}
                selected={data.data.c_engine}/>
            </LabeledList.Item>
            <LabeledList.Item label="Fuel Tank">
              <Button
                icon={data.data.c_fuel_tank ? "eject" : "chevron-down"}
                onClick={() => act('component_fuel_tank')}
                selected={data.data.c_fuel_tank}/>
            </LabeledList.Item>
            <LabeledList.Item label="Targeting Sensor">
              <Button
                icon={data.data.c_targeting_sensor ? "eject" : "chevron-down"}
                onClick={() => act('component_targeting_sensor')}
                selected={data.data.c_targeting_sensor}/>
            </LabeledList.Item>
          </LabeledList>
        </Section>
        <Section title="Loaded Munitions">
          <LabeledList>
            {data.loaded_munitions.map(type => (
              <LabeledList.Item
                key={type.type}
                label={type.label}>
                <Button
                  icon="eject"
                  onClick={() => act('remove_munition', {
                    target: type.id,
                  })}/>
              </LabeledList.Item>
            ))}
          </LabeledList>
        </Section>
      </Window.Content>
    </Window>
  );
};
