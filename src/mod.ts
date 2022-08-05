import { DependencyContainer } from "tsyringe";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

class Mod implements IPreAkiLoadMod, IPostDBLoadMod
{
    private modConfig = require("../config.json");
    preAkiLoad(container: DependencyContainer): void 
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        
        logger.info("Goggles++ Loaded");
    }

    postDBLoad(container: DependencyContainer)
    {
        if (this.modConfig.Enabled) // Is mod active?
        {
            const databaseServer = container.resolve<DatabaseServer>("DatabaseServer"); // Item Database Server
            const items = databaseServer.getTables().templates.items; // Database Server
    
            if (this.modConfig.T7.Enabled)
            {
                const t7 = items["5c110624d174af029e69734c"]; // The T-7 Thermal Goggles
        
                // Property adjustment
                t7._props.Mask = "Anvis"; // To remove cone-vision-mask ( entire screen is visible thermal )
                t7._props.RampPalette = this.modConfig.T7.Mode == "heat" ? "0" : "1" ; // Which colormap to use (0: Heat, 1: Hue)
                t7._props.IsNoisy = this.modConfig.T7.Noise; // If goggles should have noise
                t7._props.IsMotionBlurred = this.modConfig.T7.MotionBlur; // If goggles should have motion blur
                t7._props.MaskSize = 1.5; // Mask Size
                t7._props.HeatMin = this.modConfig.T7.spectrum? 0.4: 0; // Spectrum Adjustment
                t7._props.ColdMax = this.modConfig.T7.spectrum? 0.25: 1; // Spectrum Adjustment
                t7._props.MainTexColorCoef = this.modConfig.T7.spectrum? 1.5: 1; // Spectrum Adjustment Multiplier
                t7._props.RampShift = 0.05; // Spectrum Adjustment Shift Values
                t7._props.IsFpsStuck = this.modConfig.T7.FPSLimit; // If googles have a fixed refresh rate
            }
        }
    }
}

module.exports = { mod: new Mod()}
// HAVE FUN and plz credit me when building something with code from here I'm asking very nicely :D