import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
} from '@mui/material'
import { formatCurrency } from '@/utils/formatCurrency'
import { useEffect, useState } from 'react'
import { ProductData } from '@/models/product.model'
import { fecthProducts } from '@/services/serverService'
import { imageUrl } from '@/utils/common'

const Orders = () => {
  const [products, setProducts] = useState<ProductData[]>([])

  useEffect(() => {
    fecthProducts()
      .then((response) => setProducts(response.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <Container sx={{ py: 8 }} maxWidth='md'>
      {/* End hero unit */}
      <Grid container spacing={2}>
        {products && products.map((product) => (
          <Grid item key={product.product_id} xs={12} sm={6} md={3}>
            <Card className='h-full flex flex-col'>
              <CardMedia
                className='p-2'
                component='img'
                image={imageUrl(product.image)}
                alt='random'
              />
              <CardContent
                className='!p-[10px] bg-slate-100'
                sx={{ flexGrow: 1 }}
              >
                <Typography className='!text-md truncate'>
                  Heading Heading Heading Heading Heading Heading
                </Typography>
                <Typography>{formatCurrency(100)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Orders