-- Voice to MP3 to MIDI to ToneJS JSON to ROBLOX script. (basically lego vc)
-- Put in StarterCharacterScripts along with 1000hz tone called "forAThousand" (no quotes ofc)
-- Created by Sparksammy

local HttpService = game:GetService("HttpService")

local baseurl = "http://based.sparksammy.com/vc" -- change me to your base url

local baseHz = 1000 --we will need this later!

local divider = 100 --we divide notes by 100 to make the 1000 roblox sound into hz of our choosing

local char = script.Parent
local plr = game.Players:FindFirstChild(char.Name)

local toneJSON = HttpService:GetAsync(baseurl .. plr.UserId)

if (toneJSON != toneJSONOld) then
    local data = HttpService:JSONDecode(toneJSON)

    local forAThousand = char:FindFirstChild("forAThousand")

    for i, track in pairs(data.tracks) do
        for i, note in pairs(data.notes) do
            local duration = note.duration
            local noteHz = notes.midi
            forAThousand.PlaybackSpeed = noteHz / divider
            forAThousand:Play()
            wait(duration)
        end
    end
end

toneJSONOld = HttpService:GetAsync(baseurl .. plr.UserId)