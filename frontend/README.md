# React

## Why React Leafet Markers Disappear in Production
 
Leaflet expects these images to be in a specific location relative to the Leaflet library files. When you install Leaflet via npm/yarn, these images live in:

```
node_modules/leaflet/dist/images/  
```

- In development, files often served directly from node modules

## Solution

- file location: node_modules/leaflet/dist/images/marker-icon.png
- copy images directly to public/leafleft-images/
- add L.Icon.Default.imagePath = '/leaflet-images/';  