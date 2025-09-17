// Command Side - Write Operations
export interface CreateProductCommand {
  hospitalId: string
  product: {
    name: string
    manufacturer: string
    category: string
    quantity: number
    price: string
    expiresAt?: string | null
  }
}

export interface UpdateProductCommand {
  hospitalId: string
  productId: string
  product: {
    name: string
    manufacturer: string
    category: string
    quantity: number
    price: string
    expiresAt?: string | null
  }
}

export interface DeleteProductsCommand {
  hospitalId: string
  productIds: string[]
}

// Command Handlers
export class CreateProductCommandHandler {
  constructor(
    private productRepository: ProductRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: CreateProductCommand): Promise<void> {
    // Business logic for creating product
    const newProduct = await this.productRepository.create(command.hospitalId, command.product)
    
    // Publish domain event
    this.eventBus.publish(new ProductCreatedEvent(newProduct, command.hospitalId))
  }
}

export class UpdateProductCommandHandler {
  constructor(
    private productRepository: ProductRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: UpdateProductCommand): Promise<void> {
    // Business logic for updating product
    await this.productRepository.update(command.hospitalId, command.productId, command.product)
    
    // Publish domain event
    this.eventBus.publish(new ProductUpdatedEvent(command.productId, command.hospitalId))
  }
}

export class DeleteProductsCommandHandler {
  constructor(
    private productRepository: ProductRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: DeleteProductsCommand): Promise<void> {
    // Business logic for deleting products
    await this.productRepository.delete(command.hospitalId, command.productIds)
    
    // Publish domain event
    this.eventBus.publish(new ProductsDeletedEvent(command.productIds, command.hospitalId))
  }
}