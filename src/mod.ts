import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
//import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

class Mod implements IPostDBLoadMod
{
    private modConfig = require("../config.json");

    postDBLoad(container: DependencyContainer)
    {
        if (this.modConfig.Enabled) // Is mod active?
        {
            const databaseServer = container.resolve<DatabaseServer>("DatabaseServer"); // Item Database Server
            const items = databaseServer.getTables().templates.items; // Database Server
            //const logger = container.resolve<ILogger>("WinstonLogger");
    
            if (this.modConfig.T7.Enabled)
            {
                const t7 = items["5c110624d174af029e69734c"]; // The T-7 Thermal Goggles
                const heatMin = this.modConfig.modes[this.modConfig.T7.Mode][this.modConfig.T7.Spectrum? "limited": "full"].HeatMin;
                const coldMax = this.modConfig.modes[this.modConfig.T7.Mode][this.modConfig.T7.Spectrum? "limited": "full"].ColdMax;
                // Property adjustment
                t7._props.Mask = "Anvis"; // To remove cone-vision-mask ( entire screen is visible thermal )
                t7._props.RampPalette = {"heat": "0", "hue": "1", "default": "BlackHot", "whitehot": "WhiteHot"}[this.modConfig.T7.Mode]; // Which colormap to use (TODO: add seperate spectrums)
                t7._props.IsNoisy = this.modConfig.T7.Noise; // If goggles should have noise
                t7._props.IsMotionBlurred = this.modConfig.T7.MotionBlur; // If goggles should have motion blur
                t7._props.MaskSize = 1.5; // Mask Size
                t7._props.HeatMin = heatMin; // Spectrum Adjustment (TODO: add seperate spectrums for modes)
                t7._props.ColdMax = coldMax; // Spectrum Adjustment (TODO: add seperate spectrums for modes)
                t7._props.MainTexColorCoef = this.modConfig.T7.spectrum? 1.5: 1; // Spectrum Adjustment Multiplier
                t7._props.RampShift = 0.05; // Spectrum Adjustment Shift Values
                t7._props.IsFpsStuck = this.modConfig.T7.FPSLimit; // If googles have a fixed refresh rate
            }

            if (this.modConfig.PVS14.Enabled)
            {
                const pvs14 = items["57235b6f24597759bf5a30f1"]; // The AN/PVS-14 Night Vision Monocular
                pvs14._props.Mask = "Anvis"; // To remove cone-vision-mask ( entire screen is visible )
                pvs14._props.Intensity = this.modConfig.PVS14.Intensity; // To change Intensity of NVG
                pvs14._props.MaskSize = 1.5; // Mask Size
                pvs14._props.IsNoisy = this.modConfig.PVS14.Noise; // If goggles should have noise
                pvs14._props.NoiseIntensity = this.modConfig.PVS14.Noise? 0.02 : 0; // If goggles should have noise only then enable it
                pvs14._props.Color = this.modConfig.PVS14.Color; // Color Filter of PVS-14 Goggles
            }

            if (this.modConfig.PNV10T.Enabled)
            {
                const pnv10t = items["5c0696830db834001d23f5da"]; // The PNV-10T Night Vision Goggles
                pnv10t._props.Mask = "Anvis"; // To remove cone-vision-mask ( entire screen is visible )
                pnv10t._props.Intensity = this.modConfig.PNV10T.Intensity
                pnv10t._props.MaskSize = 1.5; // Mask Size
                pnv10t._props.IsNoisy = this.modConfig.PNV10T.Noise; // If goggles should have noise
                pnv10t._props.NoiseIntensity = this.modConfig.PNV10T.Noise? 0.05 : 0; // If goggles should have noise only then enable it
                pnv10t._props.Color = this.modConfig.PNV10T.Color; // Color Filter of PVS-14 Goggles
                if (this.modConfig.PNV10T.MountFix)
                {
                    const mount = items["5a16b93dfcdbcbcae6687261"];
                    mount._props.Slots[0]._props.filters[0].Filter.push("5c0696830db834001d23f5da");
                }
            }

            if (this.modConfig.N15.Enabled)
            {
                const n15 = items["5c066e3a0db834001b7353f0"]; // The N-15 Night Vision Goggles
                n15._props.Mask = "Anvis"; // To remove cone-vision-mask ( entire screen is visible )
                n15._props.Intensity = this.modConfig.N15.Intensity
                n15._props.MaskSize = 1.5; // Mask Size
                n15._props.IsNoisy = this.modConfig.N15.Noise; // If goggles should have noise
                n15._props.NoiseIntensity = this.modConfig.N15.Noise? 0.04 : 0; // If goggles should have noise only then enable it
                n15._props.Color = this.modConfig.N15.Color; // Color Filter of PVS-14 Goggles
            }

            if (this.modConfig.GPNVG18.Enabled)
            {
                const gpnvg18 = items["5c0558060db834001b735271"]; // The GPNVG-18 Night Vision Goggles
                gpnvg18._props.Mask = "Anvis"; // To remove cone-vision-mask ( entire screen is visible )
                gpnvg18._props.Intensity = this.modConfig.GPNVG18.Intensity
                gpnvg18._props.MaskSize = 1.5; // Mask Size
                gpnvg18._props.IsNoisy = this.modConfig.GPNVG18.Noise; // If goggles should have noise
                gpnvg18._props.NoiseIntensity = this.modConfig.GPNVG18.Noise? 0.02 : 0; // If goggles should have noise only then enable it
                gpnvg18._props.Color = this.modConfig.GPNVG18.Color; // Color Filter of PVS-14 Goggles
            }
        }
    }
}

module.exports = { mod: new Mod()}
// HAVE FUN and plz credit me when building something with code from here I'm asking very nicely :D