import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Autocomplete, Box, Button, Card, TextField, useMediaQuery } from '@mui/material';
import { Label } from 'src/components/label';
import useRecipe from 'src/hooks/use-recipe';
import useInventory from 'src/hooks/use-inventory';
import { fCurrency } from 'src/utils/format-number';
import { useState } from 'react';

// ----------------------------------------------------------------------

export function ProductsView() {
  const options = [
    { label: 'Iced Coffee', value: 'Iced Coffee' },
    { label: 'Hot Coffee', value: 'Hot Coffee' },
  ];
  const isMobile = useMediaQuery('(max-width:768px)');
  const { handleInputChange, input, handleCalculatePrice, totalPrice, error, handleSetError } =
    useRecipe();
  const { recipe, handleSetTotalPrice } = useRecipe();
  const { inventory } = useInventory();
  const [fieldError, setFieldError] = useState({
    selectedRecipe: false,
    qty: false,
  });

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={2}>
        <Box
          width="100%"
          height="100%"
          display="flex"
          minHeight={isMobile ? 'auto' : '50vh'}
          flexDirection="column"
          justifyContent={isMobile ? 'flex-start' : 'space-between'}
        >
          <Box display="flex" gap={2} flexDirection="column" marginBottom={4}>
            <Autocomplete
              disablePortal
              options={options}
              sx={{ width: '100%' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Receipe"
                  error={Boolean(error) || fieldError.selectedRecipe}
                />
              )}
              onChange={(event, value) => {
                handleInputChange('selectedRecipe', value ? value.value : '');
                handleSetError('');
                handleSetTotalPrice(0);
              }}
            />
            {error && (
              <Typography color="error" fontSize={12} marginTop={-2} width="100%" textAlign="end">
                {error}
              </Typography>
            )}
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              error={fieldError.qty}
              value={input.qty || ''}
              onChange={(e) => {
                handleInputChange('qty', e.target.value);
                handleSetTotalPrice(0);
              }}
            />
            <Box
              display="flex"
              gap={2}
              flexDirection={!isMobile ? 'row' : 'column'}
              justifyContent="space-between"
              alignItems="center"
            >
              <Label>Dont see your recipe?</Label>
              <Button variant="contained" disabled>
                Add Recipe (Coming Soon)
              </Button>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              handleCalculatePrice();
              setFieldError({
                selectedRecipe: !input.selectedRecipe,
                qty: !input.qty,
              });
            }}
          >
            Calculate
          </Button>
        </Box>
        <Card
          style={{
            width: '100%',
            height: '100%',
            minHeight: '50vh',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h6" borderBottom={1} borderColor="whitesmoke" paddingBottom={2}>
              Calculation Result
            </Typography>
            {totalPrice > 0 && (
              <Box display="flex" flexDirection="column" gap={2} marginTop={2}>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1">Recipe</Typography>
                    <Typography variant="body1">{input.selectedRecipe || '-'}</Typography>
                  </Box>
                  <Box
                    display="flex"
                    padding={2}
                    borderRadius={1}
                    flexDirection="column"
                    justifyContent="space-between"
                    bgcolor="primary.main"
                    color="#ffffff"
                  >
                    {recipe
                      .find((item) => item.name === input.selectedRecipe)
                      ?.recipeDetail.map((item, index) => {
                        const unit =
                          item.qty < 1
                            ? `${item.qty * 1000} ${inventory.find((inv) => inv.item === item.item)?.uom === 'kg' ? 'gr' : 'ml'}`
                            : `${item.qty} ${inventory.find((inv) => inv.item === item.item)?.uom}`;
                        return (
                          <Box
                            key={index}
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                          >
                            <Typography variant="subtitle2">{`${item.item} - ${unit} `}</Typography>
                            <Typography variant="subtitle2">
                              {fCurrency(
                                inventory.find((inv) => inv.item === item.item)?.price_per_qty
                                  ? inventory.find((inv) => inv.item === item.item)!.price_per_qty *
                                      item.qty
                                  : 0
                              )}
                            </Typography>
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">Quantity</Typography>
                  <Typography variant="body1">x {input.qty}</Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            borderTop={1}
            borderColor="whitesmoke"
            paddingTop={2}
          >
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">{fCurrency(totalPrice)}</Typography>
          </Box>
        </Card>
      </Box>
    </DashboardContent>
  );
}
